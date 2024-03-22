import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';


// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className='flex flex-wrap'>
          <div className='w-full lg:w-1/2 p-3 my-7'>
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className='h-[550px]'
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          </div>
          <div className='w-full lg:w-1/2 p-3 my-7'>
            <div className='flex flex-col gap-4'>
              <p className='text-2xl font-semibold'>
                {listing.name} - ₹{' '}
                {listing.offer
                  ? listing.discountPrice.toLocaleString('en-US')
                  : listing.regularPrice.toLocaleString('en-US')}
                {listing.type === 'rent' && ' / month'}
              </p>
              <p className='text-slate-600 text-sm'>
                <span className='text-green-700'></span> {listing.address}
              </p>
              <div className='flex gap-4'>
                <p className='bg-red-900 text-white text-center p-1 rounded-md w-full max-w-[200px]'>
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {/* <p className='bg-red-900 text-white text-center p-1 rounded-md w-full max-w-[200px]'>
                  {listing.regularPrice}
                </p> */}
                {/*  Remove conditional rendering for offer price */}
                {/* {listing.offer && (
                  <p className='bg-green-900 text-white text-center p-1 rounded-md w-full max-w-[200px]'>
                    ${+listing.regularPrice - +listing.discountPrice} OFF
                  </p>
                )} */}
              </div>
              <p className='text-slate-800'>
                <span className='font-semibold text-black'>Description - </span>
                {listing.description}
              </p>
              <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                  {listing.noOfItems > 1
                    ? `${listing.noOfItems} items `
                    : `${listing.noOfItems} item `}
                </li>
                {/* Remove commented out bathroom icon */}
                {/* <li className='flex items-center gap-1 whitespace-nowrap'>
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </li> */}
                <li className='flex items-center gap-1 whitespace-nowrap'>
                  {listing.newItem ? 'New Item' : 'Not new'}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                  {listing.used ? 'Used Item' : ''}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                  {listing.newLike ? 'New Like' : ''}
                </li>
              </ul>
              {currentUser && listing.userRef !== currentUser._id && !contact && (
                <button
                  onClick={() => setContact(true)}
                  className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-2 w-30px'
                >
                  Contact
                </button>
              )}
              {Contact && <Contact listing={listing} />}
            </div>
          </div>
        </div>
      )}
  
    </main>
  );
}
