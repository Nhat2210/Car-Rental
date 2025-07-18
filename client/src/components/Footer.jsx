import { assets } from '@/assets/assets'
import React from 'react'

const Footer = () => {
    return (
        <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300 mt-40">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
                <div className="md:max-w-96">
                    <img alt="" class="h-8 md:h-9" src={assets.logo} />
                    <p className="mt-6 text-sm">
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                        <a href="#">
                            <img src={assets.facebook_logo} alt="" className='w-5 h-5' />
                        </a>
                        <a href="#">
                            <img src={assets.instagram_logo} alt="" className='w-5 h-5' />
                        </a>
                        <a href="#">
                            <img src={assets.gmail_logo} alt="" className='w-5 h-5' />
                        </a>
                        <a href="#">
                            <img src={assets.twitter_logo} alt="" className='w-5 h-5' />
                        </a>
                    </div>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                    <div>
                        <h2 className="font-semibold mb-5">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Browse Cars</a></li>
                            <li><a href="#">List Your Car</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Partners</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>0378342817</p>
                            <p>nhatcaofedev@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-sm pb-5">
                Copyright {new Date().getFullYear()} © <a href="#">NhatCaoFEDEV</a>. All Right Reserved.
            </p>
        </footer>
    )
}

export default Footer