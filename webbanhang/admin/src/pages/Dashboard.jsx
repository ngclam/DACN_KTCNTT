import { useEffect, useState } from 'react'
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend,
    ArcElement
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

const Dashboard = ({token}) => {
    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        recentOrders: [],
        ratingStats: {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0
        },
        categoryStats: [],
        monthlyOrderStats: []
    })

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/dashboard/stats', {
                headers: { token }
            })
            
            if (response.data.success) {
                setDashboardData(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Không thể tải dữ liệu dashboard')
        }
    }

    useEffect(() => {
        if (token) {
            fetchDashboardData()
        }
    }, [token])

    // Mapping category tiếng Anh sang tiếng Việt
    const categoryMapping = {
        'Women': 'Nữ',
        'Men': 'Nam', 
        'Kids': 'Trẻ em'
    }

    // Dữ liệu cho biểu đồ đánh giá sao
    const ratingChartData = {
        labels: ['5 Sao', '4 Sao', '3 Sao', '2 Sao', '1 Sao'],
        datasets: [{
            label: 'Số lượng đánh giá',
            data: [
                dashboardData.ratingStats[5],
                dashboardData.ratingStats[4],
                dashboardData.ratingStats[3],
                dashboardData.ratingStats[2],
                dashboardData.ratingStats[1]
            ],
            backgroundColor: [
                '#10B981', // Green for 5 stars
                '#3B82F6', // Blue for 4 stars  
                '#F59E0B', // Yellow for 3 stars
                '#EF4444', // Red for 2 stars
                '#6B7280'  // Gray for 1 star
            ],
            borderWidth: 2
        }]
    }

    // Dữ liệu cho biểu đồ danh mục sản phẩm
    const categoryChartData = {
        labels: dashboardData.categoryStats.map(item => categoryMapping[item.category] || item.category),
        datasets: [{
            label: 'Số lượng sản phẩm',
            data: dashboardData.categoryStats.map(item => item.count),
            backgroundColor: [
                '#8B5CF6',
                '#10B981', 
                '#F59E0B',
                '#EF4444',
                '#3B82F6',
                '#F97316'
            ]
        }]
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Thống kê'
            }
        }
    }

    return (
        <div>
            <h2 className='mb-6 text-xl font-semibold text-gray-700'>Dashboard - Dữ liệu trực quan</h2>
            
            {/* Cards thống kê */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                <div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
                    <h3 className='text-lg font-medium text-blue-800'>Tổng sản phẩm</h3>
                    <p className='text-3xl font-bold text-blue-600'>{dashboardData.totalProducts}</p>
                </div>
                
                <div className='bg-green-50 p-6 rounded-lg border border-green-200'>
                    <h3 className='text-lg font-medium text-green-800'>Tổng đơn hàng</h3>
                    <p className='text-3xl font-bold text-green-600'>{dashboardData.totalOrders}</p>
                </div>
                
                <div className='bg-purple-50 p-6 rounded-lg border border-purple-200'>
                    <h3 className='text-lg font-medium text-purple-800'>Tổng người dùng</h3>
                    <p className='text-3xl font-bold text-purple-600'>{dashboardData.totalUsers}</p>
                </div>
            </div>

            {/* Biểu đồ */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Biểu đồ đánh giá sao */}
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h3 className='text-lg font-semibold mb-4'>Thống kê đánh giá sao</h3>
                    {dashboardData.ratingStats[5] + dashboardData.ratingStats[4] + dashboardData.ratingStats[3] + dashboardData.ratingStats[2] + dashboardData.ratingStats[1] > 0 ? (
                        <Bar data={ratingChartData} options={chartOptions} />
                    ) : (
                        <p className='text-gray-500 text-center py-8'>Chưa có đánh giá nào</p>
                    )}
                </div>

                {/* Biểu đồ danh mục sản phẩm */}
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h3 className='text-lg font-semibold mb-4'>Phân bố sản phẩm theo danh mục</h3>
                    {dashboardData.categoryStats.length > 0 ? (
                        <Doughnut data={categoryChartData} options={chartOptions} />
                    ) : (
                        <p className='text-gray-500 text-center py-8'>Chưa có dữ liệu danh mục</p>
                    )}
                </div>
            </div>

            {/* Đơn hàng gần đây */}
            <div className='mt-8 bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold mb-4'>Đơn hàng gần đây</h3>
                {dashboardData.recentOrders.length > 0 ? (
                    <div className='overflow-x-auto'>
                        <table className='w-full text-sm'>
                            <thead>
                                <tr className='border-b'>
                                    <th className='text-left py-2'>ID Đơn hàng</th>
                                    <th className='text-left py-2'>Khách hàng</th>
                                    <th className='text-left py-2'>Tổng tiền</th>
                                    <th className='text-left py-2'>Trạng thái</th>
                                    <th className='text-left py-2'>Ngày</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardData.recentOrders.map((order) => (
                                    <tr key={order._id} className='border-b'>
                                        <td className='py-2'>{order._id.slice(-6)}</td>
                                        <td className='py-2'>{order.address.firstName} {order.address.lastName}</td>
                                        <td className='py-2'>{order.amount.toLocaleString()}₫</td>
                                        <td className='py-2'>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                order.status === 'Hoàn tất' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Đang giao hàng' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className='py-2'>{new Date(order.date).toLocaleDateString('vi-VN')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className='text-gray-500 text-center py-4'>Chưa có đơn hàng nào</p>
                )}
            </div>
        </div>
    )
}

export default Dashboard
