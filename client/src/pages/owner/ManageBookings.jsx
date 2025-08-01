import { dummyMyBookingsData } from '@/assets/assets'
import Title from '@/components/Title'
import React, { useEffect, useState } from 'react'
import { assets } from '@/assets/assets'

const ManageBookings = () => {

    const [bookings, setBookings] = useState([])
    const currency = import.meta.env.VITE_CURRENCY


    const fetchOwnerBookings = async () => {
        setBookings(dummyMyBookingsData)
        console.log(bookings);

    }

    useEffect(() => {
        fetchOwnerBookings();
    }, [])
    return (
        <div className='px-4 pt-10 md:px-10 w-full'>
            <Title title="Manage Bookings" subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses" align="left" />

            <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
                <table className='w-full border-collapse text-left text-sm text-gray-600'>
                    <thead>
                        <tr>
                            <th className='p-3 font-medium'>Car</th>
                            <th className='p-3 font-medium'>Date Range</th>
                            <th className='p-3 font-medium'>Total</th>
                            <th className='p-3 font-medium'>Payment</th>
                            <th className='p-3 font-medium'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index} className='border-t border-borderColor text-gray-500'>
                                <td className='p-3 flex items-center gap-3'>
                                    <img src={booking.car.image} alt="" className='w-12 h-12 aspect-square rounded-md object-cover' />
                                    <p className='font-medium max-md:hidden'>{booking.car.brand} {booking.car.model}</p>
                                </td>
                                <td className='p-3 max-md:hidden'>
                                    {booking.pickupDate.split("T")[0]} to {booking.returnDate.split("T")[0]}
                                </td>
                                <td className='p-3'>
                                    {currency} {booking.price}
                                </td>
                                <td className='p-3 max-md:hidden'>
                                    <span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>
                                        Offline
                                    </span>
                                </td>
                                <td className='p-3 max-md:hidden'>
                                    {booking.status === 'pending' ? (
                                        <select className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none'>
                                            <option value="pending">Pending</option>
                                            <option value="pending">Confirmed</option>
                                            <option value="pending">Cancelled</option>
                                        </select>
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "confirmed" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>{booking.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageBookings