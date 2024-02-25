import React from 'react';

function NurseInput(props) {
    return (
        <div>
            <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                    aria-hidden="true">
                    <div
                        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                        ></div>
                </div>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Input form</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">The form will feed into an engine to give a recommendation</p>
                </div>
                <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2 inline-block">
                            <label htmlFor="company"
                                   className="mt-1 float-left text-sm font-semibold leading-6 text-gray-900">O2 Saturation</label>
                                <input type="text" name="company" id="company" autoComplete="organization"
                                       className="float-right ml-8 w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                        <div className="sm:col-span-2 inline-block">
                            <label htmlFor="company"
                                   className="mt-1.5 float-left text-sm font-semibold leading-6 text-gray-900">Supplementary O2</label>
                            <div className="float-right flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-1">
                                <button className="py-1 px-4 bg-blue-700 text-white focus:outline-none">Yes</button>
                                <button className="py-1 px-4 focus:outline-none">No</button>
                            </div>
                        </div>

                        <div className="sm:col-span-2 inline-block">
                            <label htmlFor="company"
                                   className="mt-1 float-left text-sm font-semibold leading-6 text-gray-900">Respiratory Rate</label>
                            <input type="text" name="company" id="company" autoComplete="organization"
                                   className="float-right ml-8 w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                        <div className="sm:col-span-2 inline-block">
                            <label htmlFor="company"
                                   className="mt-1 float-left text-sm font-semibold leading-6 text-gray-900">Temperature</label>
                            <input type="text" name="company" id="company" autoComplete="organization"
                                   className="float-right ml-8 w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                        <div className="sm:col-span-2 inline-block">
                            <label htmlFor="company"
                                   className="mt-1 float-left text-sm font-semibold leading-6 text-gray-900">Blood Pressure</label>
                            <input type="text" name="company" id="company" autoComplete="organization"
                                   className="float-right ml-8 w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                        <div className="sm:col-span-2 inline-block">
                            <label htmlFor="company"
                                   className="mt-1 float-left text-sm font-semibold leading-6 text-gray-900">Heart Rate</label>
                            <input type="text" name="company" id="company" autoComplete="organization"
                                   className="float-right ml-8 w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                        <div className="sm:col-span-2 inline-block">
                            <label htmlFor="company"
                                   className="mt-1.5 float-left text-sm font-semibold leading-6 text-gray-900">Irregular Heart Rhythm</label>
                            <div className="float-right flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-1">
                                <button className="py-1 px-4 bg-blue-700 text-white focus:outline-none">Yes</button>
                                <button className="py-1 px-4 focus:outline-none">No</button>
                            </div>
                        </div>

                        <div className="sm:col-span-2 inline-block">
                            <label htmlFor="company"
                                   className="mt-1 float-left text-sm font-semibold leading-6 text-gray-900">Hydration States</label>
                            <input type="text" name="company" id="company" autoComplete="organization"
                                   className="float-right ml-8 w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                        <div className="sm:col-span-2 inline-block">
                            <label htmlFor="company"
                                   className="mt-1 float-left text-sm font-semibold leading-6 text-gray-900">Urine Output</label>
                            <input type="text" name="company" id="company" autoComplete="organization"
                                   className="float-right ml-8 w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                        <div className="sm:col-span-2 inline-block">
                            <label htmlFor="company"
                                   className="mt-1 float-left text-sm font-semibold leading-6 text-gray-900">Alertness</label>
                            <input type="text" name="company" id="company" autoComplete="organization"
                                   className="float-right ml-8 w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                        <div className="sm:col-span-2 inline-block">
                            <label htmlFor="company"
                                   className="mt-1 float-left text-sm font-semibold leading-6 text-gray-900">Haemoglobin Level</label>
                            <input type="text" name="company" id="company" autoComplete="organization"
                                   className="float-right ml-8 w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                        <div className="sm:col-span-2 inline-block">
                            <label htmlFor="company"
                                   className="mt-1 float-left text-sm font-semibold leading-6 text-gray-900">Other Results</label>
                            <textarea name="company" id="company" autoComplete="organization"
                                   className="float-right ml-8 w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>


                        <div className="flex gap-x-4 sm:col-span-2">
                            <div className="flex h-6 items-center">

                                <button type="button"
                                        className="bg-gray-200 flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        role="switch" aria-checked="false" aria-labelledby="switch-1-label">
                                    <span className="sr-only">Agree to policies</span>

                                    <span aria-hidden="true"
                                          className="translate-x-0 h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"></span>
                                </button>
                            </div>
                            <label className="text-sm leading-6 text-gray-600" id="switch-1-label">
                                By selecting this, you agree to our
                                <a href="#" className="font-semibold text-blue-700">&nbsp;privacy&nbsp;policy</a>.
                            </label>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button type="submit"
                                className="block w-full rounded-md bg-blue-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
);
}

export default NurseInput;