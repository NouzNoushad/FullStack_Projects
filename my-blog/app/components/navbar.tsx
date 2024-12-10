import React from 'react'
import { DropdownDownIcon } from '../lib/svgs'

export default function Navbar() {
    return (
        <nav className='h-[10vh] border'>
            <div className="max-w-[1300px] mx-auto px-5 xl:px-0 h-full">
                <div className="flex flex-row items-center h-full gap-8">
                    <h1 className='font-[300] text-[1.2rem]'>Notion</h1>
                    <div className="grow w-full h-full flex flex-row items-center">
                        <ul className="h-full flex flex-row items-center gap-2 flex-1">
                            <li className='relative group'>
                                <button className='flex flex-row items-center px-2 py-1 rounded-md gap-1 group-hover:bg-gray-100 group-hover:transition-all group-hover:duration-300 cursor-pointer'>
                                    <span className='text-[0.95rem] font-[500]'>Product</span>
                                    <DropdownDownIcon className='size-3 font-bold transition-transform duration-500 group-hover:rotate-180' />
                                </button>
                                <div className="absolute top-[30px] left-0 hidden group-hover:block">
                                    <ul className='shadow-lg rounded-md px-1 py-1 w-[200px] bg-white cursor-pointer'>
                                        <li className='nav-subtext'>
                                            <h2>AI</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Docs</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Wikis</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Projects</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Calendar</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Mail</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Sites</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Forums</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Marketplace</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Integrations</h2>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='relative group'>
                                <button className='flex flex-row items-center px-2 py-1 rounded-md gap-1 group-hover:bg-gray-100 group-hover:transition-all group-hover:duration-300 cursor-pointer'>
                                    <span className='text-[0.95rem] font-[500]'>Teams</span>
                                    <DropdownDownIcon className='size-3 font-bold transition-transform duration-500 group-hover:rotate-180' />
                                </button>
                                <div className="absolute top-[30px] left-0 hidden group-hover:block">
                                    <ul className='shadow-lg rounded-md px-1 py-1 w-[200px] bg-white cursor-pointer'>
                                        <li className='nav-subtext'>
                                            <h2>Product</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Engineering</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Design</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Marketing</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>IT</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Startup</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Enterprise</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Customer stories</h2>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='relative group'>
                                <button className='flex flex-row items-center px-2 py-1 rounded-md gap-1 group-hover:bg-gray-100 group-hover:transition-all group-hover:duration-300 cursor-pointer'>
                                    <span className='text-[0.95rem] font-[500]'>Individuals</span>
                                    <DropdownDownIcon className='size-3 font-bold transition-transform duration-500 group-hover:rotate-180' />
                                </button>
                                <div className="absolute top-[30px] left-0 hidden group-hover:block">
                                    <ul className='shadow-lg rounded-md px-1 py-1 w-[200px] bg-white cursor-pointer'>
                                        <li className='nav-subtext'>
                                            <h2>Personal</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Students</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Teachers</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Creators</h2>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='relative group'>
                                <button className='flex flex-row items-center px-2 py-1 rounded-md gap-1 group-hover:bg-gray-100 group-hover:transition-all group-hover:duration-300 cursor-pointer'>
                                    <span className='text-[0.95rem] font-[500]'>Download</span>
                                    <DropdownDownIcon className='size-3 font-bold transition-transform duration-500 group-hover:rotate-180' />
                                </button>
                                <div className="absolute top-[30px] left-0 hidden group-hover:block">
                                    <ul className='shadow-lg rounded-md px-1 py-1 w-[200px] bg-white cursor-pointer'>
                                        <li className='nav-subtext'>
                                            <h2>Notion</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Calendar</h2>
                                        </li>
                                        <li className='nav-subtext'>
                                            <h2>Web clippers</h2>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='relative group'>
                                <button className='flex flex-row items-center px-2 py-1 rounded-md gap-1 group-hover:bg-gray-100 group-hover:transition-all group-hover:duration-300 cursor-pointer'>
                                    <span className='text-[0.95rem] font-[500]'>Pricing</span>
                                </button>
                            </li>
                        </ul>
                        <div className="flex flex-row items-center gap-3">
                            <button className='flex flex-row items-center px-2 py-1 rounded-md gap-1 hover:bg-gray-100 hover:transition-all hover:duration-300 cursor-pointer'>
                                <span className='text-[0.95rem] font-[500]'>Request a demo</span>
                            </button>
                            <div className="h-5 w-[0.05rem] bg-gray-300"></div>
                            <button className='flex flex-row items-center px-2 py-1 rounded-md gap-1 hover:bg-gray-100 hover:transition-all hover:duration-300 cursor-pointer'>
                                <span className='text-[0.95rem] font-[500]'>Log in</span>
                            </button>
                            <button className='px-2 py-1 bg-blue-600 rounded-md gap-1 hover:bg-blue-700 text-white hover:transition-all hover:duration-300 cursor-pointer shadow-md'>
                                <span className='text-[0.95rem] font-[500]'>Get Notion free</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
