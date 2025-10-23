import { useState, FormEvent } from "react";

// Interface cho form data
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  newsletter: boolean;
}

// Interface cho props của ContactForm
interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  onReset?: () => void;
  initialData?: Partial<ContactFormData>;
  loading?: boolean;
  className?: string;
  showNewsletter?: boolean;
  requiredFields?: (keyof ContactFormData)[];
}

// Component ContactForm với form props
export default function ContactForm({
  onSubmit,
  onReset,
  initialData = {},
  loading = false,
  className = "",
  showNewsletter = true,
  requiredFields = ['name', 'email', 'subject', 'message']
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false,
    ...initialData
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    requiredFields.forEach(field => {
      if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
        newErrors[field] = `${field} là bắt buộc`;
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Phone validation (optional)
    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      newsletter: false,
      ...initialData
    });
    setErrors({});
    if (onReset) {
      onReset();
    }
  };

  const isFieldRequired = (field: keyof ContactFormData): boolean => {
    return requiredFields.includes(field);
  };

  return (
    <form className={`contact-form ${className}`} onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">
            Họ và tên {isFieldRequired('name') && '*'}
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? 'error' : ''}
            disabled={loading}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">
            Email {isFieldRequired('email') && '*'}
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            disabled={loading}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">
            Số điện thoại {isFieldRequired('phone') && '*'}
          </label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone}
            onChange={handleInputChange}
            className={errors.phone ? 'error' : ''}
            disabled={loading}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">
            Chủ đề {isFieldRequired('subject') && '*'}
          </label>
          <select 
            id="subject" 
            name="subject" 
            value={formData.subject}
            onChange={handleInputChange}
            className={errors.subject ? 'error' : ''}
            disabled={loading}
          >
            <option value="">Chọn chủ đề</option>
            <option value="general">Tư vấn chung</option>
            <option value="product">Hỏi về sản phẩm</option>
            <option value="order">Hỏi về đơn hàng</option>
            <option value="warranty">Bảo hành</option>
            <option value="complaint">Khiếu nại</option>
            <option value="other">Khác</option>
          </select>
          {errors.subject && <span className="error-message">{errors.subject}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">
          Nội dung tin nhắn {isFieldRequired('message') && '*'}
        </label>
        <textarea 
          id="message" 
          name="message" 
          rows={5} 
          value={formData.message}
          onChange={handleInputChange}
          className={errors.message ? 'error' : ''}
          placeholder="Hãy mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
          disabled={loading}
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      {showNewsletter && (
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              id="newsletter" 
              name="newsletter" 
              checked={formData.newsletter}
              onChange={handleInputChange}
              disabled={loading}
            />
            <span className="checkmark"></span>
            Tôi muốn nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
          </label>
        </div>
      )}

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary btn-large"
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Đang gửi...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i>
              Gửi tin nhắn
            </>
          )}
        </button>
        
        <button 
          type="button" 
          className="btn btn-outline"
          onClick={handleReset}
          disabled={loading}
        >
          <i className="fas fa-undo"></i>
          Làm mới
        </button>
      </div>
    </form>
  );
}
