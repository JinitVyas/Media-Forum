import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CardGenerator = () => {
    const [userProfile, setUserProfile] = useState({
        name: '',
        designation: '',
        userMobile: '',
        profilePhoto: '',   
        phoneNumber: '',
        issueDate: '',
        expireDate: '',
    });

    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        // Fetching user profile from session storage
        const fetchUserProfile = () => {
            const storedUserProfile = JSON.parse(sessionStorage.getItem('userProfile'));
            if (storedUserProfile) {
                const issueDate = new Date(storedUserProfile.registrationDate);  // Assuming registrationDate is stored in session
                const expireDate = new Date(issueDate);
                expireDate.setFullYear(issueDate.getFullYear() + 1);  // Set expiry date 1 year later

                setUserProfile({
                    name: storedUserProfile.name,
                    designation: storedUserProfile.designation,
                    userMobile: storedUserProfile.userMobile,
                    profilePhoto: storedUserProfile.profilePhoto,
                    phoneNumber: storedUserProfile.phoneNumber,
                    issueDate: issueDate.toLocaleDateString(),  // Format the date
                    expireDate: expireDate.toLocaleDateString(),
                });
            }
        };
        fetchUserProfile();
    }, []);

    const downloadPDF = async () => {
        setIsDownloading(true);
        const capture = document.getElementById('IDCARD');
    
        if (!capture) {
            console.error('Capture element not found');
            return;
        }
    
        const canvas = await html2canvas(capture, {
            scale: 2,
            scrollX: 0,
            scrollY: 0,
            useCORS: true,
            allowTaint: true,
            logging: true,
        });
    
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm', 'a4');
    
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * pageWidth) / canvas.width;
        const topMargin = 10;
    
        if (imgHeight > pageHeight - topMargin) {
            doc.addImage(imgData, 'PNG', 0, topMargin, pageWidth, pageHeight - topMargin);
        } else {
            doc.addImage(imgData, 'PNG', 0, topMargin, imgWidth, imgHeight);
        }

        doc.save('Card.pdf');

        setTimeout(() => {
            setIsDownloading(false);  // Reset button state after download is complete
        }, 1000);
    };

    return (
        <div>
            <div id='IDCARD' className='w-full flex justify-center gap-10'>
                <div className="flex flex-col items-center">
                    {/* Front Side */}
                    <div className="border-[1px] border-gray-600 w-[450px] h-[300px] rounded-lg shadow-xl bg-white relative overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center">
                            <img
                                src="/Photos/Logo.jpg"
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
                        <div className='px-2'>
                            <p className="text-[13px] text-red-500 text-center font-bold ">
                                IDENTITY CARD
                            </p>
                            <div className="flex">
                                <div className='mt-2'>
                                    <img
                                        src={userProfile.profilePhoto || '/Photos/PersonIcon.jpg'}
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
                                    <p>
                                        <span className="font-bold">ISSUE DATE: </span>
                                        <span className="font-normal">{userProfile.issueDate || 'Loading...'}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">EXPIRE DATE: </span>
                                        <span className="font-normal">{userProfile.expireDate || 'Loading...'}</span>
                                    </p>
                                </div>
                                {/* QR Code Section */}
                                <div className="ml-4 mt-3">
                                    <img
                                        src="/Photos/QR.jpg"
                                        alt="QR Code"
                                        className="w-16 h-16"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Footer */}
                        <div>
                            <p className='mt-2 pb-2 bg-blue-700 text-white text-center text-[12px] font-bold m-0 p-0'>
                                सबका साथ, सबका विकास
                            </p>
                            <div className='bg-red-600 pb-3 pt-0'>
                                <p className='text-white text-center text-[13px] font-medium tracking-wider m-0 p-0'>
                                    www.digitalindiaeducation.co.in
                                </p>
                                <p className='text-white text-center text-[13px] font-medium tracking-wider m-0 p-0'>
                                    REGISTERED UNDER GOVERNMENT OF INDIA
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Back Side */}
                    <div className="border-[1px] border-gray-600 w-[450px] h-[300px] rounded-lg shadow-xl bg-white relative overflow-hidden mt-4">
                        <div className="bg-gradient-to-r from-blue-500 to-red-500 text-white text-center pb-3 font-semibold text-[12px] leading-tight">
                            <p className="text-[16px] tracking-wide ">DIGITAL INDIA EDUCATION & DIGITAL INDIA MEDIA</p>
                            <p className="text-[11px]">REGISTERED UNDER GOVERNMENT OF INDIA REGISTRATION NO {userProfile.phoneNumber || 'Loading...'}</p>
                        </div>
                        <div className="px-4 text-[10px] leading-tight mb-1">
                            <p className="font-bold underline mb-3 text-[15px] text-center text-red-600">
                                Declaration
                            </p>
                            <ul className="list-disc pl-5 font-semibold text-[12px] mb-3">
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
                        <div className="bg-gradient-to-r from-blue-500 to-red-500 leading-tight pb-3">
                            <p className='text-white text-center text-[13px] font-semibold' >Corporate Office: E-112, Siddhi Appartment, Near Madhuvan Society, Ghodasar, Ahmedabad - 380050</p>
                            <p className='text-white text-center text-[13px] font-semibold' >www.digitalindiaeducation.co.in</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex items-center justify-center mt-5'>
                <button
                    type="submit"
                    className={`bg-[#1f2937] hover:bg-[#1f2937e2] w-32 rounded text-white p-2 ${isDownloading ? 'bg-[#1f2937] hover:bg-[#1f2937e2]' : 'hover:bg-[#1f2937e2]'}`}
                    onClick={downloadPDF}
                    disabled={isDownloading}
                >
                    {isDownloading ? "Downloading..." : "Download Card"}
                </button>
            </div>
        </div>
    );
};
export default CardGenerator;