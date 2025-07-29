import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiUpload, FiLink, FiTag } from 'react-icons/fi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { WithContext as ReactTags } from 'react-tag-input';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Button from '../Shared/Button/Button';

const EditProduct = ({ product, onClose, onUpdate }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [tags, setTags] = useState(product.tags?.map(tag => ({ id: tag, text: tag })) || []);
  const [externalLink, setExternalLink] = useState(product.externalLink || '');
  const [isUploading, setIsUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

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

  const updateProductMutation = useMutation({
    mutationFn: (updatedProduct) => 
      axiosSecure.put(`/products/${product._id}`, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(['myProducts']);
      toast.success('Product updated successfully!', {
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
      onClose();
    },
    onError: (error) => {
      toast.error('Failed to update product');
      console.error('Update error:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      name,
      description,
      image,
      tags: tags.map(tag => tag.text),
      externalLink,
    };
    updateProductMutation.mutate(updatedProduct);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-[#00f5ff]/10 border-b border-[#9d00ff]/30">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Edit Product</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#b8b8b8] hover:text-white hover:bg-[#0a0a12] transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-[#b8b8b8] mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a12] text-white border border-[#9d00ff]/50 focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff]/50 outline-none transition duration-200"
                required
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-[#b8b8b8] mb-1">
                Product Image
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={image}
                  alt="Current product"
                  className="w-24 h-24 rounded-lg object-cover border border-[#9d00ff]/30"
                />
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[#9d00ff]/50 rounded-lg cursor-pointer bg-[#0a0a12] hover:border-[#00f5ff] transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-6 h-6 mb-2 text-[#9d00ff]" />
                      <p className="text-sm text-[#b8b8b8]">Change Image</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setIsUploading(true);
                        try {
                          // Implement your image upload logic here
                          // const imageUrl = await uploadImage(file);
                          // setImage(imageUrl);
                        } finally {
                          setIsUploading(false);
                        }
                      }}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#b8b8b8] mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a12] text-white border border-[#9d00ff]/50 focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff]/50 outline-none transition duration-200"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-[#b8b8b8] mb-1">
                Tags
              </label>
              <ReactTags
                tags={tags}
                handleDelete={handleTagDelete}
                handleAddition={handleTagAddition}
                handleDrag={handleTagDrag}
                delimiters={delimiters}
                inputFieldPosition="bottom"
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

            {/* External Link */}
            <div>
              <label className="block text-sm font-medium text-[#b8b8b8] mb-1">
                External Link
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[#9d00ff]/50 bg-[#0a0a12] text-[#b8b8b8]">
                  <FiLink className="w-5 h-5" />
                </span>
                <input
                  type="url"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-r-lg bg-[#0a0a12] text-white border border-[#9d00ff]/50 focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff]/50 outline-none transition duration-200"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                label="Cancel"
                outline
                className="border-[#9d00ff] text-[#9d00ff]"
              />
              <Button
                type="submit"
                label={updateProductMutation.isLoading ? "Updating..." : "Update Product"}
                disabled={updateProductMutation.isLoading}
                className="bg-gradient-to-r from-[#00f5ff] to-[#9d00ff] hover:from-[#9d00ff] hover:to-[#00f5ff]"
              />
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditProduct;