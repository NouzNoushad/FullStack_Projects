import React from 'react'
import { ArrowLeft, ArrowRight } from '../lib/svgs'

export default function RightSection() {
  return (
      <div className="mt-8 flex-1 lg:ml-[25%]">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              {
                  Array.from({ length: 8 }).map((value, index) => (
                      <div className="space-y-2" key={index}>
                          <div className="h-[300px] w-full border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                          </div>
                          <p className="text-[0.8rem] text-gray-500">Notion HQ</p>
                          <h2 className="font-bold text-[1.5rem] transition-all duration-300 hover:text-blue-500"><a href="#">Clippy Walked So Notion AI Could Run</a></h2>
                          <p className="text-gray-500">We asked former Microsoft exec, Steven Sinofsky, about the iconic paperclip and how it paved the way for the future of AI helpers.</p>
                          <figure className="flex flex-row gap-2">
                              <div className="h-auto w-[50px] flex items-center justify-center">
                                  <div className="h-[40px] w-[40px] rounded-full bg-gray-400"></div>
                              </div>
                              <div className="author">
                                  <h4 className="font-[600]">Grace Nguyen, Xiaoya He</h4>
                                  <small className="text-gray-500">Engineering</small>
                              </div>
                          </figure>
                      </div>
                  ))
              }
          </div>
          {/* pagination */}
          <div className="my-8 flex flex-row items-center justify-center gap-1">
              <button className="px-2 py-2 w-[35px] h-[40px] rounded-md transition-all duration-300 hover:bg-gray-200 flex items-center justify-center">
                  <ArrowLeft className="size-4" />
              </button>

              {
                  Array.from({ length: 5 }).map((value, index) => (
                      <button key={index} className="px-2 py-2 w-[35px] h-[40px] rounded-md transition-all duration-300 hover:bg-gray-200 text-[0.9rem]">
                          {index + 1}</button>
                  ))
              }
              <button className="px-2 py-2 w-[35px] h-[40px] rounded-md transition-all duration-300 hover:bg-gray-200 flex items-center justify-center">
                  <ArrowRight className="size-4" />
              </button>
          </div>
      </div>
  )
}
