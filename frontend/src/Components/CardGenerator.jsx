import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CardGenerator = () => {
    const [userProfile, setUserProfile] = useState({
        name: '',
        designation: '',
        userMobile: '',
        profilePhoto: '',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('YOUR_API_ENDPOINT'); // Update this with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserProfile({
                    name: data.name,
                    designation: data.designation,
                    userMobile: data.userMobile,
                    profilePhoto: data.profilePhoto,
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUserProfile();
    }, []);

    const downloadPDF = () => {
        const capture = document.getElementById('IDCARD');

        // Increase the scale and height for better resolution
        html2canvas(capture, {
            scale: 3, // Higher scale for higher resolution
            useCORS: true,
            allowTaint: true,
            logging: true,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'mm', 'a4');

            // Get page dimensions
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            // Calculate height to maintain aspect ratio
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * pageWidth) / canvas.width;

            // Ensure the entire image fits on the page
            if (imgHeight > pageHeight) {
                doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
            } else {
                doc.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
            }

            doc.save('Card.pdf');
        });
    };

    return (
        <div>
            <div id='IDCARD' className='w-full flex justify-center gap-10'>
                <div className="flex flex-col items-center">
                    {/* Front Side */}
                    <div className="border-[1px] border-gray-600 w-[420px] h-[265px] rounded-lg shadow-xl bg-white relative overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center">
                            <img
                                src="/Photos/Logo.jpg"  // Make sure the image paths are correct
                                alt="Logo"
                                className="pl-2 w-30 h-20 object-fill"
                            />
                            <div className='w-full'>
                                <h2 className='text-[20px] tracking-wider text-nowrap text-center font-extrabold text-red-600'>
                                    <span className='text-[22px]'>D</span>IGITAL <span className='text-[22px]'>I</span>NDIA <span className='text-[22px]'>E</span>DUCATION
                                </h2>
                                <p className='text-center font-bold mt-[-10px]'>wa</p>
                                <h2 className='tracking-wide text-center mt-[-10px] text-[40px] font-extrabold'>
                                    <span className='text-red-600'>DIGITAL</span> <span className='text-blue-700'>MEDIA</span>
                                </h2>
                            </div>
                        </div>

                        {/* Photo and Info Section */}
                        <div className='px-2 mt-2'>
                            <p className="text-[13px] text-red-500 text-center font-bold ">IDENTITY CARD</p>
                            <div className="flex">
                                <div className='mt-[-15px]'>
                                    <img
                                        src={userProfile.profilePhoto || '/Photos/PersonIcon.jpg'}  // Ensure correct image paths
                                        alt="Profile"
                                        className="w-20 h-15 border-[1px] border-gray-500"
                                    />
                                </div>

                                <div className="ml-4 text-[12px] font-semibold leading-snug flex-grow">
                                    <p>
                                        <span className="font-bold">NAME: </span>
                                        <span className="font-normal">{userProfile.name || 'Loading...'}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">DESIGNATION: </span>
                                        <span className="font-normal">{userProfile.designation || 'Loading...'}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">USER MOBILE: </span>
                                        <span className="font-normal">{userProfile.userMobile || 'Loading...'}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">WORKING AREA: </span>
                                        <span className="font-normal">ALL INDIA</span>
                                    </p>
                                </div>

                                {/* QR Code Section */}
                                <div className="ml-4">
                                    <img
                                        src="/Photos/QR.jpg"  // Update this image path
                                        alt="QR Code"
                                        className="w-16 h-16"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div>
                            <p className='mt-2 bg-blue-700 text-white text-center text-[12px] font-bold'>सबका साथ, सबका विकास</p>
                            <hr /><hr /><hr />
                            <div className='bg-red-600 pb-2'>
                                <p className=' text-white text-center text-[13px] font-medium tracking-wider'>www.digitalindiaeducation.co.in</p>
                                <p className=' text-white text-center text-[13px] font-medium tracking-wider'>REGISTERED UNDER GOVERNMENT OF INDIA</p>
                            </div>
                        </div>
                    </div>

                    {/* Back Side */}
                    <div className="border-[1px] border-gray-600 w-[420px] h-[265px] rounded-lg shadow-xl bg-white relative overflow-hidden mt-4">
                        <div className="bg-gradient-to-r from-blue-500 to-red-500 text-white text-center py-2 font-semibold text-[12px] leading-tight">
                            <p className="text-[15px] tracking-wide ">DIGITAL INDIA EDUCATION & DIGITAL INDIA MEDIA</p>
                            <p className="text-[10px]">REGISTERED UNDER GOVERNMENT OF INDIA REGISTRATION NO GJ 01 0200853</p>
                        </div>

                        <div className="px-4 text-[10px] leading-tight mb-1">
                            <p className="font-bold underline text-[15px] text-center text-red-600">
                                Declaration
                            </p>
                            <ul className="list-disc pl-5 font-semibold text-[11px] mb-2">
                                <li>This Card is issued for the Identification of the Member & must be produced on demand.</li>
                                <li>The Card Holder is authorized to book advertisements from all over India for the website & promote the website throughout India.</li>
                                <li>This Card Is Not A Reporter Card.</li>
                                <li>The Company Is Not Liable For any illegal activity of the card holder.</li>
                                <li>If the Card is lost, the Member must lodge an FIR & inform the issuing authority.</li>
                                <li>This Card is not valid anymore after the validity date.</li>
                                <li>After Expire validity of card, the member must renew the card.</li>
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="bg-gradient-to-r from-blue-500 to-red-500 text-white text-center text-[12px] font-semibold leading-tight pb-2">
                            <p>Corporate Office: E-112, Siddhi Appartment, Near Madhuvan Society, Ghodasar, Ahmedabad - 380050</p>
                            <p>www.digitalindiaeducation.co.in</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex items-center justify-center mt-5'>
                <button className='bg-[#1f2937] hover:bg-[#1f2937e2] text-white py-2 px-4 rounded-xl'
                    onClick={downloadPDF}
                >
                    Download Card
                </button>
            </div>
        </div>
    );
};

export default CardGenerator;