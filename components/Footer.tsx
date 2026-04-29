const Footer = () => {
    const shop = [
        'Groceries & Staples', 'Electronics', 'Fashion & Apparel',
        'Home & Kitchen', 'Beauty & Personal Care', 'Toys & Baby', 'Sports & Fitness',
    ]
    const account = [
        'My Orders', 'Track Shipment', 'Wishlist',
        'ApnaMart Plus', 'Gift Cards', 'Refer & Earn', 'Coupons & Offers',
    ]
    const support = [
        'Help Centre', 'Returns & Refunds', 'Shipping Policy',
        'Cancellation Policy', 'Sell on ApnaMart', 'Advertise with Us', 'Careers',
    ]

    return (
        <footer className="bg-white border-t border-gray-100 pt-12 px-6 sm:px-10 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Top grid */}
                <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-gray-100">

                    {/* Brand column */}
                    <div className="col-span-2 lg:col-span-1">

                        {/* Logo + name */}
                        <div className="flex items-center gap-2.5 mb-3">
                            {/* <div className="w-9 h-9 rounded-[10px] bg-gray-50 border border-gray-200 flex items-center justify-center gap-1.5 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-gray-900" />
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div> */}
                            <img
                                src="/logo.png"
                                alt="ApnaMart"
                                className="h-9 w-9 sm:h-10 sm:w-10 object-contain rounded-xl"
                            />
                            <span className="text-[22px] font-semibold text-gray-900 tracking-tight">ApnaMart</span>
                        </div>

                        <p className="text-sm text-gray-500 leading-relaxed max-w-[220px] mb-5">
                            India's favourite online mart — groceries, gadgets, fashion & more, delivered fast.
                        </p>

                        {/* Newsletter */}
                        <div className="mb-5">
                            {/* <p className="text-[11px] font-semibold text-gray-900 uppercase tracking-widest mb-2.5">
                Stay in the loop
              </p> */}
                            {/* <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-[9px] px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
                />
                <button className="bg-gray-900 text-white rounded-[9px] px-4 text-[13px] font-semibold hover:bg-gray-700 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div> */}
                        </div>

                        {/* Trust badges */}
                        {/* <div className="flex flex-wrap gap-4 mb-5">
              {['Free delivery over ₹499', '10-min delivery', 'Easy 7-day returns'].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-[12px] text-gray-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div> */}

                        {/* App store buttons */}
                        <div className="flex gap-2 flex-wrap mb-5">
                            {[
                                { sub: 'Download on the', name: 'App Store' },
                                { sub: 'Get it on', name: 'Google Play' },
                            ].map((btn) => (
                                <button
                                    key={btn.name}
                                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-[10px] px-3 py-2 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex gap-2 items-center text-left">
                                        <img
                                            src={`${btn.name == "Google Play" ? "play-store.png" : btn.name == "App Store" ? "app-store.png" : null}`}
                                            alt="ApnaMart"
                                            className="h-9 w-9 sm:h-10 sm:w-10 object-contain rounded-xl"
                                        />
                                        <div className="flex-col flex">

                                            <span className="text-[10px] text-gray-400 leading-none">
                                                {btn.sub}</span>
                                            <span className="text-[13px] text-gray-800 font-medium leading-snug">{btn.name}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Social icons */}
                        {/* <div className="flex gap-2">
              {['Instagram', 'X', 'Facebook', 'YouTube'].map((s) => (
                <button
                  key={s}
                  aria-label={s}
                  className="w-[34px] h-[34px] rounded-[8px] bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-500 text-xs font-medium">{s[0]}</span>
                </button>
              ))}
            </div> */}
                    </div>

                    {/* Link columns */}
                    {[
                        { title: 'Shop', links: shop },
                        { title: 'Account', links: account },
                        { title: 'Support', links: support },
                    ].map(({ title, links }) => (
                        <div key={title}>
                            <p className="text-[11px] font-semibold text-gray-900 uppercase tracking-widest mb-4">{title}</p>
                            <ul className="flex flex-col gap-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-5">
                    <p className="text-[13px] text-gray-400">
                        © {new Date().getFullYear()} ApnaMart Technologies Pvt. Ltd. All rights reserved.
                    </p>
                    <div className="flex flex-wrap gap-5">
                        {['Privacy Policy', 'Terms of Use', 'Cookie Settings', 'Sitemap'].map((l) => (
                            <a key={l} href="#" className="text-[13px] text-gray-400 hover:text-gray-700 transition-colors">
                                {l}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer