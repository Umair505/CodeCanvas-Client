import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WithContext as ReactTags } from 'react-tag-input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiUpload, FiLink, FiUser, FiMail, FiImage } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import { uploadImage } from '../../../api/utils';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [tags, setTags] = useState([]);
  const [externalLink, setExternalLink] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!uploadedImage) {
      toast.error('Please upload an image first', {
        style: {
          background: '#1a1a2e',
          color: '#ff3864',
          border: '1px solid #ff3864',
        },
        iconTheme: {
          primary: '#ff3864',
          secondary: '#FFF',
        }
      });
      return;
    }

    setIsUploading(true);
    
    const form = e.target;
    const name = form?.name?.value;
    const description = form?.description?.value;
    
    try {
      const productData = {
        name,
        description,
        image: uploadedImage,
        tags: tags.map(tag => tag.text),
        externalLink,
        owner: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL
        },
        status: 'pending', // Set initial status to pending
        createdAt: new Date(),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/add-product`, productData);
      
      toast.success('Product added successfully!', {
        style: {
          background: '#1a1a2e',
          color: '#00f5ff',
          border: '1px solid #00f5ff',
        },
        iconTheme: {
          primary: '#00f5ff',
          secondary: '#1a1a2e',
        },
        duration: 3000
      });
      
      form.reset();
      setTags([]);
      setExternalLink('');
      setUploadedImage(null);
      navigate('/dashboard/my-products');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product', {
        style: {
          background: '#1a1a2e',
          color: '#ff3864',
          border: '1px solid #ff3864',
        },
        iconTheme: {
          primary: '#ff3864',
          secondary: '#FFF',
        }
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    
    try {
      setIsImageUploading(true);
      setImageError(false);
      
      toast.loading('Uploading image...', {
        style: {
          background: '#1a1a2e',
          color: '#9d00ff',
          border: '1px solid #9d00ff',
        },
        iconTheme: {
          primary: '#9d00ff',
          secondary: '#FFF',
        },
        duration: 2000
      });

      const imageUrl = await uploadImage(image);
      setUploadedImage(imageUrl);
      
      toast.success('Image uploaded successfully!', {
        style: {
          background: '#1a1a2e',
          color: '#00f5ff',
          border: '1px solid #00f5ff',
        },
        iconTheme: {
          primary: '#00f5ff',
          secondary: '#1a1a2e',
        },
        duration: 2000
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageError(true);
      toast.error('Failed to upload image', {
        style: {
          background: '#1a1a2e',
          color: '#ff3864',
          border: '1px solid #ff3864',
        },
        iconTheme: {
          primary: '#ff3864',
          secondary: '#FFF',
        }
      });
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleTagDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleTagAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleTagDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 p-6">
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#9d00ff]">
          Add New Product
        </h2>
        
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#b8b8b8] mb-1">
              Product Name <span className="text-[#ff3864]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a12] text-white border border-[#9d00ff]/50 focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff]/50 outline-none transition duration-200"
              placeholder="Enter product name"
            />
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium text-[#b8b8b8] mb-1">
              Product Image <span className="text-[#ff3864]">*</span>
            </label>
            <div className="flex items-center space-x-4">
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isImageUploading 
                  ? 'border-[#00f5ff] bg-[#00f5ff]/10' 
                  : imageError 
                    ? 'border-[#ff3864] bg-[#ff3864]/10' 
                    : 'border-[#9d00ff]/50 bg-[#0a0a12] hover:border-[#00f5ff]'
              }`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isImageUploading ? (
                    <div className="flex flex-col items-center">
                      <svg className="animate-spin h-8 w-8 mb-2 text-[#00f5ff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-sm text-[#00f5ff]">Uploading...</p>
                    </div>
                  ) : (
                    <>
                      <FiUpload className={`w-8 h-8 mb-2 ${
                        imageError ? 'text-[#ff3864]' : 'text-[#9d00ff]'
                      }`} />
                      <p className={`text-sm ${
                        imageError ? 'text-[#ff3864]' : 'text-[#b8b8b8]'
                      }`}>
                        {uploadedImage ? 'Change Image' : 'Click to upload'}
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                  accept="image/*"
                  disabled={isImageUploading}
                />
              </label>
              {uploadedImage && (
                <div className="w-32 h-32 rounded-lg overflow-hidden border border-[#9d00ff]/30 relative">
                  <img 
                    src={uploadedImage} 
                    alt="Product Preview" 
                    className="w-full h-full object-cover"
                  />
                  {isImageUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
            {imageError && (
              <p className="mt-1 text-sm text-[#ff3864]">Failed to upload image. Please try again.</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#b8b8b8] mb-1">
              Description <span className="text-[#ff3864]">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a12] text-white border border-[#9d00ff]/50 focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff]/50 outline-none transition duration-200"
              placeholder="Describe your product..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-[#b8b8b8] mb-1">
              Tags
            </label>
            <div className="bg-[#0a0a12] rounded-lg border border-[#9d00ff]/50 p-2">
              <ReactTags
                tags={tags}
                handleDelete={handleTagDelete}
                handleAddition={handleTagAddition}
                handleDrag={handleTagDrag}
                delimiters={delimiters}
                inputFieldPosition="bottom"
                autocomplete
                placeholder="Add tags (press enter or comma)"
                classNames={{
                  tags: 'tags-container',
                  tagInput: 'tag-input',
                  tag: 'tag bg-[#9d00ff]/20 text-[#00f5ff] border border-[#9d00ff]/50',
                  remove: 'tag-remove text-[#ff3864]',
                  tagInputField: 'w-full bg-transparent text-white outline-none px-2 py-1',
                }}
              />
            </div>
          </div>

          {/* External Link */}
          <div>
            <label htmlFor="externalLink" className="block text-sm font-medium text-[#b8b8b8] mb-1">
              External Link
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[#9d00ff]/50 bg-[#0a0a12] text-[#b8b8b8]">
                <FiLink className="w-5 h-5" />
              </span>
              <input
                type="url"
                id="externalLink"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                className="w-full px-4 py-2.5 rounded-r-lg bg-[#0a0a12] text-white border border-[#9d00ff]/50 focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff]/50 outline-none transition duration-200"
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Owner Info */}
          <div className="bg-[#0a0a12]/50 p-4 rounded-lg border border-[#9d00ff]/30">
            <h3 className="text-sm font-medium text-[#00f5ff] mb-3">Product Owner</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <FiUser className="text-[#9d00ff] w-5 h-5" />
                <div>
                  <p className="text-xs text-[#b8b8b8]">Name</p>
                  <p className="text-sm text-white">{user?.displayName || 'Not available'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-[#9d00ff] w-5 h-5" />
                <div>
                  <p className="text-xs text-[#b8b8b8]">Email</p>
                  <p className="text-sm text-white">{user?.email || 'Not available'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiImage className="text-[#9d00ff] w-5 h-5" />
                <div>
                  <p className="text-xs text-[#b8b8b8]">Image</p>
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Owner" 
                      className="w-8 h-8 rounded-full border border-[#9d00ff]"
                    />
                  ) : (
                    <p className="text-sm text-white">Not available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isUploading || !uploadedImage}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                isUploading || !uploadedImage
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#9d00ff] to-[#00f5ff] hover:shadow-lg hover:shadow-[#9d00ff]/30'
              }`}
            >
              {isUploading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Product...
                </span>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;