import Image from 'next/image';
import { Icon } from "@iconify/react/dist/iconify.js";
import { getImagePrefix } from '@/utils/util';

const Hero = () => {
    return (
        <section id="home-section" className='bg-slateGray'>
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 pt-20">
                <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1 items-center'>
                    {/* TEXT SECTION */}
                    <div className='col-span-6 flex flex-col gap-8'>
                        <h1 className='text-midnight_text text-4xl sm:text-5xl font-semibold'>
                            Welcome to Dr. Nkuna & Partners
                        </h1>
                        <h3 className='text-black/70 text-lg'>
                            Compassionate, professional healthcare you can trust. Book your appointment today.
                        </h3>

                        {/* Call to Actions */}
                        <div className='flex gap-4 pt-4'>
                            <a
                                href="#booking"
                                className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-secondary transition"
                            >
                                Book Consultation
                            </a>
                            <a
                                href="https://wa.me/27781832955?text=Hi%20I%20would%20like%20to%20book%20an%20appointment"
                                target="_blank"
                                className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>

                        {/* Trust Badges */}
                        <div className='flex items-center justify-between pt-10 lg:pt-4'>
                            <div className='flex gap-2'>
                                <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                <p className='text-sm sm:text-lg font-normal text-black'>Affordable Care</p>
                            </div>
                            <div className='flex gap-2'>
                                <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                <p className='text-sm sm:text-lg font-normal text-black'>Experienced Team</p>
                            </div>
                            <div className='flex gap-2'>
                                <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                <p className='text-sm sm:text-lg font-normal text-black'>Same-Day Booking</p>
                            </div>
                        </div>
                    </div>

                    {/* IMAGE SECTION */}
                    <div className='col-span-6 flex justify-center'>
                        <Image
                            src={`${getImagePrefix()}images/banner/doctor-illustration.png`}
                            alt="Doctor illustration"
                            width={800}
                            height={600}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
