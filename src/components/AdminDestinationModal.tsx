import React, { useState, useEffect } from 'react';
import { X, Upload, MapPin, DollarSign, Users, Star, Calendar, Camera } from 'lucide-react';
import { DestinationData } from '../data/adminMockData';

interface AdminDestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination?: DestinationData;
  onSave: (destination: DestinationData) => void;
}

const AdminDestinationModal: React.FC<AdminDestinationModalProps> = ({
  isOpen,
  onClose,
  destination,
  onSave
}) => {
  const [formData, setFormData] = useState<DestinationData>({
    id: 0,
    name: '',
    location: '',
    description: '',
    price: 0,
    duration: '',
    maxGroupSize: 1,
    difficulty: 'Easy',
    category: 'Safari',
    images: [],
    highlights: [''],
    included: [''],
    notIncluded: [''],
    status: 'Draft',
    rating: 0,
    bookings: 0,
    revenue: 0,
    totalBookings: 0
  });

  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (destination) {
      setFormData(destination);
    } else {
      setFormData({
        id: 0,
        name: '',
        location: '',
        description: '',
        price: 0,
        duration: '',
        maxGroupSize: 1,
        difficulty: 'Easy',
        category: 'Safari',
        images: [],
        highlights: [''],
        included: [''],
        notIncluded: [''],
        status: 'Draft',
        rating: 0,
        bookings: 0,
        revenue: 0,
        totalBookings: 0
      });
    }
  }, [destination, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof DestinationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'highlights' | 'included' | 'notIncluded', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'highlights' | 'included' | 'notIncluded') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field: 'highlights' | 'included' | 'notIncluded', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Destination Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Serengeti National Park"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Northern Tanzania"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe the destination and experience..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2500"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="5 days"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Group Size</label>
          <input
            type="number"
            value={formData.maxGroupSize}
            onChange={(e) => handleInputChange('maxGroupSize', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="8"
            min="1"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Safari">Safari</option>
            <option value="Beach">Beach</option>
            <option value="Mountain">Mountain</option>
            <option value="Cultural">Cultural</option>
            <option value="Adventure">Adventure</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
          <select
            value={formData.difficulty}
            onChange={(e) => handleInputChange('difficulty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Challenging">Challenging</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderArraySection = (
    title: string,
    field: 'highlights' | 'included' | 'notIncluded',
    placeholder: string
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
      <div className="space-y-2">
        {formData[field].map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange(field, index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => removeArrayItem(field, index)}
              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(field)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          + Add {title.slice(0, -1)}
        </button>
      </div>
    </div>
  );

  const renderDetails = () => (
    <div className="space-y-6">
      {renderArraySection('Highlights', 'highlights', 'e.g., Big Five wildlife viewing')}
      {renderArraySection('Included', 'included', 'e.g., All meals and accommodation')}
      {renderArraySection('Not Included', 'notIncluded', 'e.g., International flights')}
    </div>
  );

  const renderImages = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Upload destination images</p>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="inline mr-2" size={16} />
            Choose Files
          </button>
        </div>
      </div>
      
      {formData.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {formData.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Destination ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  const newImages = formData.images.filter((_, i) => i !== index);
                  handleInputChange('images', newImages);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {destination ? 'Edit Destination' : 'Add New Destination'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 flex-shrink-0">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'basic', label: 'Basic Info', icon: MapPin },
              { id: 'details', label: 'Details', icon: Star },
              { id: 'images', label: 'Images', icon: Camera }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'basic' && renderBasicInfo()}
            {activeTab === 'details' && renderDetails()}
            {activeTab === 'images' && renderImages()}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {destination ? 'Update Destination' : 'Create Destination'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDestinationModal;
