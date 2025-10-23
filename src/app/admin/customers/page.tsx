'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Alert from '@/components/Alert';

export default function AdminCustomers() {
  const [currentUser] = useLocalStorage<any>('currentUser', null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Load customers from localStorage
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Create customer list with order statistics
    const customerData = usersData.map((user: any) => {
      const userOrders = allOrders.filter((order: any) => order.customer.email === user.email);
      const totalSpent = userOrders.reduce((sum: number, order: any) => sum + order.total, 0);
      const orderCount = userOrders.length;
      
      return {
        ...user,
        totalSpent,
        orderCount,
        lastOrderDate: userOrders.length > 0 ? userOrders[userOrders.length - 1].createdAt : null,
        status: user.isActive !== false ? 'active' : 'inactive'
      };
    });
    
    setCustomers(customerData);
    setFilteredCustomers(customerData);
  }, []);

  useEffect(() => {
    let filtered = customers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, statusFilter]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleCustomerStatus = (customerId: number) => {
    const updatedCustomers = customers.map(customer =>
      customer.id === customerId 
        ? { ...customer, status: customer.status === 'active' ? 'inactive' : 'active' }
        : customer
    );
    
    // Update localStorage
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = usersData.map((user: any) =>
      user.id === customerId 
        ? { ...user, isActive: updatedCustomers.find(c => c.id === customerId)?.status === 'active' }
        : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setCustomers(updatedCustomers);
    
    const customer = customers.find(c => c.id === customerId);
    setAlertMessage(`${customer?.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'} tài khoản ${customer?.name} thành công!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const deleteCustomer = (customerId: number) => {
    const customer = customers.find(c => c.id === customerId);
    if (confirm(`Bạn có chắc chắn muốn xóa khách hàng ${customer?.name}? Hành động này không thể hoàn tác.`)) {
      const updatedCustomers = customers.filter(c => c.id !== customerId);
      
      // Update localStorage
      const usersData = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = usersData.filter((user: any) => user.id !== customerId);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      setCustomers(updatedCustomers);
      setAlertMessage(`Đã xóa khách hàng ${customer?.name} thành công!`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  if (!currentUser) {
    return (
      <>
        <Header />
        <section className="page-header">
          <div className="container">
            <h1>Admin - Quản lý khách hàng</h1>
            <p>Bạn cần đăng nhập để truy cập trang này</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {showAlert && (
        <Alert type="success" message={alertMessage} onClose={() => setShowAlert(false)} />
      )}

      <section className="page-header">
        <div className="container">
          <h1>Quản lý khách hàng</h1>
          <p>Quản lý danh sách khách hàng của cửa hàng</p>
        </div>
      </section>

      <section className="admin-customers">
        <div className="container">
          {/* Filters */}
          <div className="customers-header">
            <div className="filters">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Tìm kiếm khách hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
              
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="status-filter"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Đã vô hiệu hóa</option>
              </select>
            </div>
            
            <div className="customers-summary">
              <div className="summary-item">
                <span>Tổng khách hàng:</span>
                <strong>{customers.length}</strong>
              </div>
              <div className="summary-item">
                <span>Đang hoạt động:</span>
                <strong>{customers.filter(c => c.status === 'active').length}</strong>
              </div>
            </div>
          </div>

          {/* Customers List */}
          <div className="customers-table">
            <div className="table-header">
              <div className="table-cell">Khách hàng</div>
              <div className="table-cell">Thông tin liên hệ</div>
              <div className="table-cell">Thống kê</div>
              <div className="table-cell">Trạng thái</div>
              <div className="table-cell">Thao tác</div>
            </div>
            
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="table-row">
                <div className="table-cell">
                  <div className="customer-info">
                    <div className="customer-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="customer-details">
                      <h4>{customer.name}</h4>
                      <p>ID: #{customer.id}</p>
                      <span className="join-date">
                        Tham gia: {formatDate(customer.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="table-cell">
                  <div className="contact-info">
                    <div className="contact-item">
                      <i className="fas fa-envelope"></i>
                      <span>{customer.email}</span>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-phone"></i>
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="table-cell">
                  <div className="stats-info">
                    <div className="stat-item">
                      <span className="stat-label">Đơn hàng:</span>
                      <span className="stat-value">{customer.orderCount}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Tổng chi:</span>
                      <span className="stat-value">{formatPrice(customer.totalSpent)}</span>
                    </div>
                    {customer.lastOrderDate && (
                      <div className="stat-item">
                        <span className="stat-label">Đơn cuối:</span>
                        <span className="stat-value">{formatDate(customer.lastOrderDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="table-cell">
                  <span className={`status-badge ${customer.status === 'active' ? 'active' : 'inactive'}`}>
                    {customer.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa'}
                  </span>
                </div>
                
                <div className="table-cell">
                  <div className="action-buttons">
                    <button 
                      className={`btn btn-sm ${customer.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => toggleCustomerStatus(customer.id)}
                      title={customer.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                    >
                      <i className={`fas fa-${customer.status === 'active' ? 'ban' : 'check'}`}></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteCustomer(customer.id)}
                      title="Xóa khách hàng"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCustomers.length === 0 && (
            <div className="no-customers">
              <i className="fas fa-users"></i>
              <h3>Không tìm thấy khách hàng nào</h3>
              <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

