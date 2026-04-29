'use client'
import { useState, useRef } from 'react'
import {
    ArrowLeft, X, Tag, Package, IndianRupee,
    Star, ImagePlus, Loader2, CheckCircle2, ScrollText
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type FormType = {
    name: string
    price: string
    originalPrice: string
    rating: string
    image: string
    description: string
}

type ErrorType = {
    name?: string
    price?: string
    originalPrice?: string
    rating?: string
    image?: string
    description?: string
    submit?: string
}

const AddItemPage = () => {

    const [form, setForm] = useState<FormType>({
        name: '',
        price: '',
        originalPrice: '',
        rating: '',
        image: '',
        description: ''
    })

    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState<ErrorType>({})

    const fileRef = useRef<HTMLInputElement | null>(null)

    const discount =
        form.price && form.originalPrice && Number(form.originalPrice) > 0
            ? Math.round(((Number(form.originalPrice) - Number(form.price)) / Number(form.originalPrice)) * 100)
            : 0

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setImageFile(file)

        const reader = new FileReader()
        reader.onload = () => {
            setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        setForm(prev => ({ ...prev, image: `/${file.name}` }))
        setErrors(prev => ({ ...prev, image: '' }))
    }

    const validate = () => {
        const newErrors: ErrorType = {}

        if (!form.name.trim()) newErrors.name = 'Product name is required'
        if (!form.price || Number(form.price) <= 0) newErrors.price = 'Enter a valid price'
        if (!form.originalPrice || Number(form.originalPrice) <= 0) newErrors.originalPrice = 'Enter a valid original price'
        if (Number(form.price) >= Number(form.originalPrice)) newErrors.price = 'Sale price must be less than original'
        if (!form.rating || Number(form.rating) < 1 || Number(form.rating) > 5) newErrors.rating = 'Rating must be between 1–5'
        if (!form.image) newErrors.image = 'Please upload a product image'
        if (!form.description.trim()) newErrors.description = 'Description is required'

        return newErrors
    }

    const uploadToImageKit = async (): Promise<string> => {
        if (!imageFile) throw new Error('No image selected')

        const authRes = await fetch(`${process.env.NEXT_PUBLIC_HOST_SERVER_ADDRESS}/api/imagekit/auth`)
        const authData = await authRes.json()

        const { token, expire, signature, publicKey } = authData.data

        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('fileName', imageFile.name)
        formData.append('publicKey', publicKey)
        formData.append('token', token)
        formData.append('expire', expire)
        formData.append('signature', signature)

        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT}`, {
            method: 'POST',
            body: formData
        })

        if (!uploadRes.ok) throw new Error('Image upload failed')

        const result = await uploadRes.json()
        return result.url
    }

    const handleSubmit = async () => {
        const newErrors = validate()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)

        try {
            const imageUrl = await uploadToImageKit()

            const payload = {
                name: form.name.trim(),
                price: Number(form.originalPrice),
                discountedPrice: Number(form.price),
                rating: Number(form.rating),
                url: imageUrl,
                description: form.description.trim(),
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_SERVER_ADDRESS}/api/add/product`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error('Server error')

            setSuccess(true)
            setForm({
                name: '',
                price: '',
                originalPrice: '',
                rating: '',
                image: '',
                description: ''
            })
            setImagePreview(null)
            setImageFile(null)

            setTimeout(() => setSuccess(false), 3000)

        } catch (err) {
            setErrors({ submit: 'Failed to add item. Please try again.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ── Header ── */}
            <div className="sticky top-0 bg-white border-b border-gray-100 shadow-sm" style={{ zIndex: 30 }}>
                <div className="max-w-7xl mx-auto px-5 h-16 flex items-center gap-4">
                    <Link href="/" className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
                        <ArrowLeft size={22} />
                    </Link>
                    <div className="flex items-center gap-2.5">
                        <Image
                            height={40}
                            width={40}
                            src="/logo.png"
                            alt="ApnaMart"
                            className="h-9 w-9 sm:h-10 sm:w-10 object-contain rounded-xl"
                        />
                        <span className="text-xl sm:text-[22px] font-semibold tracking-tight">ApnaMart</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-5 py-8">

                {/* Page Title */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Add New Item</h1>
                    <p className="text-[14px] text-gray-500 mt-1">Fill in the details below to list a new product.</p>
                </div>

                {/* Success Banner */}
                {success && (
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 px-5 py-4 rounded-2xl mb-6">
                        <CheckCircle2 size={20} className="shrink-0 text-green-600" />
                        <p className="text-[15px] font-medium">Item added successfully!</p>
                    </div>
                )}

                {/* ── Two-column layout on lg+ ── */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">

                    {/* ── LEFT COLUMN: Image Upload ── */}
                    <div className="w-full lg:w-[420px] lg:shrink-0 space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <p className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                Product Image
                            </p>
                            <div
                                onClick={() => fileRef.current?.click()}
                                className="relative w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-100 transition-all overflow-hidden"
                                style={{ height: '320px' }}
                            >
                                {imagePreview ? (
                                    <>
                                        <Image src={imagePreview} alt="Preview" fill className="object-contain p-3" />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setImagePreview(null)
                                                setImageFile(null)
                                                setForm((prev) => ({ ...prev, image: '' }))
                                            }}
                                            className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md hover:bg-red-50 transition-colors"
                                        >
                                            <X size={16} className="text-gray-600" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <ImagePlus size={40} className="text-gray-300 mb-3" />
                                        <p className="text-[15px] font-medium text-gray-500">Click to upload image</p>
                                        <p className="text-[12px] text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                    </>
                                )}
                            </div>
                            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            {errors.image && <p className="text-red-500 text-[12px] mt-2">{errors.image}</p>}
                        </div>

                        {/* Preview Card — shown in left col on desktop */}
                        {(form.name || form.price) && (
                            <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <p className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                    Preview
                                </p>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden shrink-0">
                                        {imagePreview
                                            ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                            : <div className="w-full h-full flex items-center justify-center text-gray-400"><Package size={24} /></div>
                                        }
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[15px] font-semibold text-gray-900 truncate">{form.name || '—'}</p>
                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                            {form.price && <span className="text-[15px] font-bold text-gray-900">₹{Number(form.price).toLocaleString('en-IN')}</span>}
                                            {form.originalPrice && <span className="text-[13px] text-gray-400 line-through">₹{Number(form.originalPrice).toLocaleString('en-IN')}</span>}
                                            {discount > 0 && <span className="text-[12px] font-semibold text-green-600">{discount}% off</span>}
                                        </div>
                                        {form.rating && (
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                                <span className="text-[12px] font-medium text-gray-600">{form.rating}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT COLUMN: Form ── */}
                    <div className="flex-1 space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <p className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider">
                                Product Details
                            </p>

                            {/* Name */}
                            <div>
                                <label className="text-[13px] font-medium text-gray-600 mb-1.5 flex items-center gap-2">
                                    <Package size={14} /> Product Name
                                </label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Nike Running Shoes"
                                    className={`w-full px-4 py-3 rounded-xl border text-[15px] text-gray-900 placeholder-gray-400 outline-none transition-all
                                    ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-gray-400 focus:bg-white'}`}
                                />
                                {errors.name && <p className="text-red-500 text-[12px] mt-1.5">{errors.name}</p>}
                            </div>

                            {/* Price Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[13px] font-medium text-gray-600 mb-1.5 flex items-center gap-2">
                                        <IndianRupee size={14} /> Sale Price
                                    </label>
                                    <input
                                        name="price"
                                        type="number"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="3999"
                                        className={`w-full px-4 py-3 rounded-xl border text-[15px] text-gray-900 placeholder-gray-400 outline-none transition-all
                                        ${errors.price ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-gray-400 focus:bg-white'}`}
                                    />
                                    {errors.price && <p className="text-red-500 text-[12px] mt-1.5">{errors.price}</p>}
                                </div>
                                <div>
                                    <label className="text-[13px] font-medium text-gray-600 mb-1.5 flex items-center gap-2">
                                        <IndianRupee size={14} /> Original Price
                                    </label>
                                    <input
                                        name="originalPrice"
                                        type="number"
                                        value={form.originalPrice}
                                        onChange={handleChange}
                                        placeholder="6999"
                                        className={`w-full px-4 py-3 rounded-xl border text-[15px] text-gray-900 placeholder-gray-400 outline-none transition-all
                                        ${errors.originalPrice ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-gray-400 focus:bg-white'}`}
                                    />
                                    {errors.originalPrice && <p className="text-red-500 text-[12px] mt-1.5">{errors.originalPrice}</p>}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-[13px] font-medium text-gray-600 mb-1.5 flex items-center gap-2">
                                        <ScrollText size={14} /> Product Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="Write something about product"
                                        rows={4}
                                        className={`w-full px-4 py-3 rounded-xl border text-[15px] text-gray-900 placeholder-gray-400 outline-none transition-all resize-none
        ${errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-gray-400 focus:bg-white'}`}
                                    />

                                    {errors.description && (
                                        <p className="text-red-500 text-[12px] mt-1.5">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Discount Preview */}
                            {discount !== null && discount > 0 && (
                                <div className="flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-3 rounded-xl">
                                    <Tag size={15} className="text-green-600" />
                                    <span className="text-[14px] font-semibold text-green-700">{discount}% off</span>
                                    <span className="text-[13px] text-green-600">will be applied</span>
                                </div>
                            )}

                            {/* Rating */}
                            <div>
                                <label className="text-[13px] font-medium text-gray-600 mb-1.5 flex items-center gap-2">
                                    <Star size={14} /> Rating (1–5)
                                </label>
                                <input
                                    name="rating"
                                    type="number"
                                    step="0.1"
                                    min="1"
                                    max="5"
                                    value={form.rating}
                                    onChange={handleChange}
                                    placeholder="4.5"
                                    className={`w-full px-4 py-3 rounded-xl border text-[15px] text-gray-900 placeholder-gray-400 outline-none transition-all
                                    ${errors.rating ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-gray-400 focus:bg-white'}`}
                                />
                                {errors.rating && <p className="text-red-500 text-[12px] mt-1.5">{errors.rating}</p>}
                            </div>
                        </div>

                        {/* Preview Card — shown below form on mobile */}
                        {(form.name || form.price) && (
                            <div className="lg:hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <p className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                    Preview
                                </p>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden shrink-0">
                                        {imagePreview
                                            ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                            : <div className="w-full h-full flex items-center justify-center text-gray-400"><Package size={24} /></div>
                                        }
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[15px] font-semibold text-gray-900 truncate">{form.name || '—'}</p>
                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                            {form.price && <span className="text-[15px] font-bold text-gray-900">₹{Number(form.price).toLocaleString('en-IN')}</span>}
                                            {form.originalPrice && <span className="text-[13px] text-gray-400 line-through">₹{Number(form.originalPrice).toLocaleString('en-IN')}</span>}
                                            {discount > 0 && <span className="text-[12px] font-semibold text-green-600">{discount}% off</span>}
                                        </div>
                                        {form.rating && (
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                                <span className="text-[12px] font-medium text-gray-600">{form.rating}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-[14px]">
                                {errors.submit}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-gray-900 text-white text-[16px] font-bold py-4 rounded-2xl hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Adding Item...
                                </>
                            ) : (
                                <>
                                    <Package size={20} />
                                    Add Item
                                </>
                            )}
                        </button>

                        <div className="h-6" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItemPage