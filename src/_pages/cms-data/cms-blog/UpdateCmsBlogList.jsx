import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Select from "react-select";
import {
  useUpdateCmsBlogListMutation,
  useGetCmsBlogCategoriesListQuery,
  useGetCmsBlogAuthorListQuery,
  useGetCmsBlogListQuery,
} from "../../../_store/api";
import RichTextEditor from "../../../_components/table/RichTextEditor";
import toast from "react-hot-toast";

const UpdateCmsBlogList = ({ isOpen, onClose, selectedRow }) => {
  console.log("selectedRow", selectedRow);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    heading_line_2: "",
    sub_title: "",
    tag_line: "",
    description: "",
    meta_description: "",
    meta_keywords: "",
    author_id: "",
    written_by: "",
    category_ids: [],
    recommended_blog_ids: [],
    view_counts: "",
    likes_count: "",
    mobile_views: "",
    web_views: "",
    is_featured: false,
    is_published: true,
    publish_date: "",

    // Mobile Featured Image
    mobile_featured_image: null,
    mobile_featured_image_alt: "",
    mobile_featured_image_title: "",
    mobile_featured_image_caption: "",
    mobile_featured_image_description: "",

    // Mobile Title Image
    mobile_title_image: null,
    mobile_title_image_alt: "",
    mobile_title_image_title: "",
    mobile_title_image_caption: "",
    mobile_title_image_description: "",

    // Web Featured Image
    web_featured_image: null,
    web_featured_image_alt: "",
    web_featured_image_title: "",
    web_featured_image_caption: "",
    web_featured_image_description: "",

    // Web Title Image
    web_title_image: null,
    web_title_image_alt: "",
    web_title_image_title: "",
    web_title_image_caption: "",
    web_title_image_description: "",
  });

  const [blogData, setBlogData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [authorData, setAuthorData] = useState([]);

  const [UpdateData, { isLoading }] = useUpdateCmsBlogListMutation();
  const { data: fetchBlogData } = useGetCmsBlogListQuery({});
  const { data: fetchCategoryData } = useGetCmsBlogCategoriesListQuery({});
  const { data: fetchAutorData } = useGetCmsBlogAuthorListQuery({});

  // Populate form data when selectedRow changes
  useEffect(() => {
    if (selectedRow && isOpen) {
      // Format publish_date for datetime-local input
      const formatDateTime = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

      setFormData({
        title: selectedRow.title || "",
        slug: selectedRow.slug?.current || "",
        heading_line_2: selectedRow.headingLine2 || "", // CHANGED: headingLine2 (camelCase)
        sub_title: selectedRow.subTitle || "",
        tag_line: selectedRow.tagLine || "",
        description: selectedRow.description || "",
        meta_description: selectedRow.metaDescription || "",
        meta_keywords: selectedRow.metaKeywords || "",
        author_id: selectedRow.authorId || selectedRow.author?._id || "", // CHANGED: authorId and author._id
        written_by: selectedRow.writtenBy || "", // CHANGED: writtenBy (camelCase)
        category_ids: selectedRow.category_ids || [],
        recommended_blog_ids: selectedRow.recommended_blog_ids || [],
        view_counts: selectedRow.viewCounts || "",
        likes_count: selectedRow.likesCount || "",
        mobile_views: selectedRow.mobileViews || "",
        web_views: selectedRow.webViews || "",
        is_featured:
          selectedRow.is_featured === 1 || selectedRow.is_featured === true,
        is_published:
          selectedRow.is_published === 1 || selectedRow.is_published === true,
        publish_date: formatDateTime(selectedRow.publish_date),

        // Mobile Featured Image - keep null for file input, load metadata
        mobile_featured_image: null, // CHANGED: null instead of URL
        mobile_featured_image_alt: selectedRow.mobileFeaturedImage?.alt || "",
        mobile_featured_image_title:
          selectedRow.mobileFeaturedImage?.title || "",
        mobile_featured_image_caption:
          selectedRow.mobileFeaturedImage?.caption || "",
        mobile_featured_image_description:
          selectedRow.mobileFeaturedImage?.description || "",

        // Mobile Title Image
        mobile_title_image: null,
        mobile_title_image_alt: selectedRow.mobileTitleImage?.alt || "", // CHANGED: mobileTitleImage (camelCase)
        mobile_title_image_title: selectedRow.mobileTitleImage?.title || "",
        mobile_title_image_caption: selectedRow.mobileTitleImage?.caption || "",
        mobile_title_image_description:
          selectedRow.mobileTitleImage?.description || "",

        // Web Featured Image
        web_featured_image: null,
        web_featured_image_alt: selectedRow.webFeaturedImage?.alt || "", // CHANGED: webFeaturedImage (camelCase)
        web_featured_image_title: selectedRow.webFeaturedImage?.title || "",
        web_featured_image_caption: selectedRow.webFeaturedImage?.caption || "",
        web_featured_image_description:
          selectedRow.webFeaturedImage?.description || "",

        // Web Title Image
        web_title_image: null,
        web_title_image_alt: selectedRow.webTitleImage?.alt || "", // CHANGED: webTitleImage (camelCase)
        web_title_image_title: selectedRow.webTitleImage?.title || "",
        web_title_image_caption: selectedRow.webTitleImage?.caption || "",
        web_title_image_description:
          selectedRow.webTitleImage?.description || "",
      });
    }
  }, [selectedRow, isOpen]);

  useEffect(() => {
    if (fetchBlogData) {
      setBlogData(fetchBlogData?.data);
    } else {
      setBlogData([]);
    }
  }, [fetchBlogData]);

  useEffect(() => {
    if (fetchCategoryData) {
      setCategoryData(fetchCategoryData?.data);
    } else {
      setCategoryData([]);
    }
  }, [fetchCategoryData]);

  useEffect(() => {
    if (fetchAutorData) {
      setAuthorData(fetchAutorData?.data);
    } else {
      setAuthorData([]);
    }
  }, [fetchAutorData]);

  // Prepare options for react-select
  const categoryOptions = categoryData.map((category) => ({
    value: category.id,
    label: category.title,
  }));

  const blogOptions = blogData
    .filter((blog) => blog.id !== selectedRow?.id) // Exclude current blog from recommendations
    .map((blog) => ({
      value: blog.id,
      label: blog.title,
    }));

  const authorOptions = authorData.map((author) => ({
    value: author.id,
    label: author.name,
  }));

  const handleChange = (event) => {
    const { name, value, type, files, checked } = event.target;

    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Handle react-select changes
  const handleSelectChange = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;

    if (name === "category_ids" || name === "recommended_blog_ids") {
      // For multi-select, store array of IDs
      const ids = selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [];
      setFormData((prevData) => ({ ...prevData, [name]: ids }));
    } else if (name === "author_id") {
      // For single select, store single ID
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedOptions ? selectedOptions.value : "",
      }));
    }
  };

  // Handler for RichTextEditor's onChange event
  const handleDescriptionChange = (html) => {
    setFormData((prevData) => ({ ...prevData, description: html }));
  };

  const handleSubmit = async () => {
    if (!selectedRow?._id) {
      toast.error("Blog ID is missing");
      return;
    }

    const newData = new FormData();

    // Basic Information
    newData.append("title", formData.title);
    newData.append("slug", formData.slug);
    newData.append("heading_line_2", formData.heading_line_2);
    newData.append("sub_title", formData.sub_title);
    newData.append("tag_line", formData.tag_line);
    newData.append("description", formData.description);

    // Meta Information
    newData.append("meta_description", formData.meta_description);
    newData.append("meta_keywords", formData.meta_keywords);

    // Author Information
    newData.append("author_id", formData.author_id);
    newData.append("written_by", formData.written_by);

    // Categories and Recommendations - format as JSON array string
    newData.append("category_ids", JSON.stringify(formData.category_ids));
    newData.append(
      "recommended_blog_ids",
      JSON.stringify(formData.recommended_blog_ids)
    );

    // Statistics
    newData.append("view_counts", formData.view_counts);
    newData.append("likes_count", formData.likes_count);
    newData.append("mobile_views", formData.mobile_views);
    newData.append("web_views", formData.web_views);

    // Publishing Information
    newData.append("is_featured", formData.is_featured ? "1" : "0");
    newData.append("is_published", formData.is_published ? "1" : "0");
    newData.append("publish_date", formData.publish_date);

    // Mobile Featured Image - only append if new file is selected
    if (formData.mobile_featured_image) {
      newData.append("mobile_featured_image", formData.mobile_featured_image);
    }
    newData.append(
      "mobile_featured_image_alt",
      formData.mobile_featured_image_alt
    );
    newData.append(
      "mobile_featured_image_title",
      formData.mobile_featured_image_title
    );
    newData.append(
      "mobile_featured_image_caption",
      formData.mobile_featured_image_caption
    );
    newData.append(
      "mobile_featured_image_description",
      formData.mobile_featured_image_description
    );

    // Mobile Title Image
    if (formData.mobile_title_image) {
      newData.append("mobile_title_image", formData.mobile_title_image);
    }
    newData.append("mobile_title_image_alt", formData.mobile_title_image_alt);
    newData.append(
      "mobile_title_image_title",
      formData.mobile_title_image_title
    );
    newData.append(
      "mobile_title_image_caption",
      formData.mobile_title_image_caption
    );
    newData.append(
      "mobile_title_image_description",
      formData.mobile_title_image_description
    );

    // Web Featured Image
    if (formData.web_featured_image) {
      newData.append("web_featured_image", formData.web_featured_image);
    }
    newData.append("web_featured_image_alt", formData.web_featured_image_alt);
    newData.append(
      "web_featured_image_title",
      formData.web_featured_image_title
    );
    newData.append(
      "web_featured_image_caption",
      formData.web_featured_image_caption
    );
    newData.append(
      "web_featured_image_description",
      formData.web_featured_image_description
    );

    // Web Title Image
    if (formData.web_title_image) {
      newData.append("web_title_image", formData.web_title_image);
    }
    newData.append("web_title_image_alt", formData.web_title_image_alt);
    newData.append("web_title_image_title", formData.web_title_image_title);
    newData.append("web_title_image_caption", formData.web_title_image_caption);
    newData.append(
      "web_title_image_description",
      formData.web_title_image_description
    );

    try {
      // Pass the blog ID along with the form data
      const response = await UpdateData({
        id: selectedRow._id,
        body: newData,
      }).unwrap();

      if (response.status) {
        toast.success(response.message || "Blog updated successfully");
        onClose();
      } else {
        toast.error(response.message || "Failed to update blog");
        return;
      }
    } catch (error) {
      console.log("Failed to update blog", error);
      toast.error(error?.data?.message || "Failed to update blog");
    }
  };

  // Custom styles for react-select
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: "42px",
      borderColor: "#ddd",
      "&:hover": {
        borderColor: "#999",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  // Get selected values for react-select
  const selectedCategories = categoryOptions.filter((option) =>
    formData.category_ids.includes(option.value)
  );

  const selectedRecommendedBlogs = blogOptions.filter((option) =>
    formData.recommended_blog_ids.includes(option.value)
  );

  const selectedAuthor = authorOptions.find(
    (option) => option.value === formData.author_id
  );

  return (
    <ReactModal
      className="cms-modal"
      overlayClassName="cms-overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className="cms-modal-container">
        <h2 className="cms-modal-heading">Update Blog Post</h2>

        <div className="cms-form-wrapper">
          {/* Basic Information */}
          <div className="cms-section">
            <h3 className="cms-section-title">Basic Information</h3>

            <div className="cms-form-group">
              <label className="cms-label">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Enter URL slug"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Heading Line 2</label>
              <input
                type="text"
                name="heading_line_2"
                value={formData.heading_line_2}
                onChange={handleChange}
                placeholder="Enter secondary heading"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Sub Title</label>
              <input
                type="text"
                name="sub_title"
                value={formData.sub_title}
                onChange={handleChange}
                placeholder="Enter subtitle"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Tag Line</label>
              <textarea
                name="tag_line"
                value={formData.tag_line}
                onChange={handleChange}
                placeholder="Enter tag line"
                className="cms-textarea"
                rows="3"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description *</label>
              <RichTextEditor
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Enter blog description here..."
                height="300px"
              />
            </div>
          </div>

          {/* SEO Information */}
          <div className="cms-section">
            <h3 className="cms-section-title">SEO Information</h3>

            <div className="cms-form-group">
              <label className="cms-label">Meta Description</label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                placeholder="Enter meta description"
                className="cms-textarea"
                rows="3"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Meta Keywords</label>
              <input
                type="text"
                name="meta_keywords"
                value={formData.meta_keywords}
                onChange={handleChange}
                placeholder="Enter meta keywords (comma separated)"
                className="cms-input-field"
              />
            </div>
          </div>

          {/* Author Information */}
          <div className="cms-section">
            <h3 className="cms-section-title">Author Information</h3>

            <div className="cms-form-group">
              <label className="cms-label">Author *</label>
              <Select
                name="author_id"
                options={authorOptions}
                value={selectedAuthor}
                onChange={handleSelectChange}
                placeholder="Select author..."
                isClearable
                styles={customSelectStyles}
                className="cms-select-container"
                classNamePrefix="cms-select"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Written By</label>
              <input
                type="text"
                name="written_by"
                value={formData.written_by}
                onChange={handleChange}
                placeholder="Enter author name"
                className="cms-input-field"
              />
            </div>
          </div>

          {/* Categories and Recommendations */}
          <div className="cms-section">
            <h3 className="cms-section-title">Categories & Recommendations</h3>

            <div className="cms-form-group">
              <label className="cms-label">Categories *</label>
              <Select
                name="category_ids"
                options={categoryOptions}
                value={selectedCategories}
                onChange={handleSelectChange}
                placeholder="Select categories..."
                isMulti
                isClearable
                styles={customSelectStyles}
                className="cms-select-container"
                classNamePrefix="cms-select"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Recommended Blogs</label>
              <Select
                name="recommended_blog_ids"
                options={blogOptions}
                value={selectedRecommendedBlogs}
                onChange={handleSelectChange}
                placeholder="Select recommended blogs..."
                isMulti
                isClearable
                styles={customSelectStyles}
                className="cms-select-container"
                classNamePrefix="cms-select"
              />
            </div>
          </div>

          {/* Statistics */}
          <div className="cms-section">
            <h3 className="cms-section-title">Statistics</h3>

            <div className="cms-form-group">
              <label className="cms-label">View Counts</label>
              <input
                type="number"
                name="view_counts"
                value={formData.view_counts}
                onChange={handleChange}
                placeholder="Enter view counts"
                className="cms-input-field"
                min="0"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Likes Count</label>
              <input
                type="number"
                name="likes_count"
                value={formData.likes_count}
                onChange={handleChange}
                placeholder="Enter likes count"
                className="cms-input-field"
                min="0"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Mobile Views</label>
              <input
                type="number"
                name="mobile_views"
                value={formData.mobile_views}
                onChange={handleChange}
                placeholder="Enter mobile views"
                className="cms-input-field"
                min="0"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Web Views</label>
              <input
                type="number"
                name="web_views"
                value={formData.web_views}
                onChange={handleChange}
                placeholder="Enter web views"
                className="cms-input-field"
                min="0"
              />
            </div>
          </div>

          {/* Publishing Information */}
          <div className="cms-section">
            <h3 className="cms-section-title">Publishing Information</h3>

            <div className="cms-form-group">
              <label className="cms-label">Publish Date</label>
              <input
                type="datetime-local"
                name="publish_date"
                value={formData.publish_date}
                onChange={handleChange}
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label cms-checkbox-label">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="cms-checkbox"
                />
                <span>Featured</span>
              </label>
            </div>

            <div className="cms-form-group">
              <label className="cms-label cms-checkbox-label">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="cms-checkbox"
                />
                <span>Published</span>
              </label>
            </div>
          </div>

          {/* Mobile Featured Image */}
          <div className="cms-section">
            <h3 className="cms-section-title">Mobile Featured Image</h3>

            <div className="cms-form-group">
              <label className="cms-label">Mobile Featured Image</label>
              <input
                type="file"
                name="mobile_featured_image"
                onChange={handleChange}
                className="cms-file-input"
                accept="image/*"
              />
              {formData.mobile_featured_image && (
                <span className="cms-file-name">
                  {formData.mobile_featured_image.name}
                </span>
              )}

              {selectedRow?.mobileFeaturedImage &&
                !formData.mobile_featured_image && (
                  <span className="cms-file-info">
                    Current image exists (upload new to replace)
                  </span>
                )}
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Alt Text</label>
              <input
                type="text"
                name="mobile_featured_image_alt"
                value={formData.mobile_featured_image_alt}
                onChange={handleChange}
                placeholder="Enter alt text"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Image Title</label>
              <input
                type="text"
                name="mobile_featured_image_title"
                value={formData.mobile_featured_image_title}
                onChange={handleChange}
                placeholder="Enter image title"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Caption</label>
              <textarea
                name="mobile_featured_image_caption"
                value={formData.mobile_featured_image_caption}
                onChange={handleChange}
                placeholder="Enter caption"
                className="cms-textarea"
                rows="2"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description</label>
              <textarea
                name="mobile_featured_image_description"
                value={formData.mobile_featured_image_description}
                onChange={handleChange}
                placeholder="Enter description"
                className="cms-textarea"
                rows="3"
              />
            </div>
          </div>

          {/* Mobile Title Image */}
          <div className="cms-section">
            <h3 className="cms-section-title">Mobile Title Image</h3>

            <div className="cms-form-group">
              <label className="cms-label">Mobile Title Image</label>
              <input
                type="file"
                name="mobile_title_image"
                onChange={handleChange}
                className="cms-file-input"
                accept="image/*"
              />
              {formData.mobile_title_image && (
                <span className="cms-file-name">
                  {formData.mobile_title_image.name}
                </span>
              )}
              {selectedRow?.mobileTitleImage &&
                !formData.mobile_title_image && (
                  <span className="cms-file-info">
                    Current image exists (upload new to replace)
                  </span>
                )}
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Alt Text</label>
              <input
                type="text"
                name="mobile_title_image_alt"
                value={formData.mobile_title_image_alt}
                onChange={handleChange}
                placeholder="Enter alt text"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Image Title</label>
              <input
                type="text"
                name="mobile_title_image_title"
                value={formData.mobile_title_image_title}
                onChange={handleChange}
                placeholder="Enter image title"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Caption</label>
              <textarea
                name="mobile_title_image_caption"
                value={formData.mobile_title_image_caption}
                onChange={handleChange}
                placeholder="Enter caption"
                className="cms-textarea"
                rows="2"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description</label>
              <textarea
                name="mobile_title_image_description"
                value={formData.mobile_title_image_description}
                onChange={handleChange}
                placeholder="Enter description"
                className="cms-textarea"
                rows="3"
              />
            </div>
          </div>

          {/* Web Featured Image */}
          <div className="cms-section">
            <h3 className="cms-section-title">Web Featured Image</h3>

            <div className="cms-form-group">
              <label className="cms-label">Web Featured Image</label>
              <input
                type="file"
                name="web_featured_image"
                onChange={handleChange}
                className="cms-file-input"
                accept="image/*"
              />
              {formData.web_featured_image && (
                <span className="cms-file-name">
                  {formData.web_featured_image.name}
                </span>
              )}
              {selectedRow?.webFeaturedImage &&
                !formData.web_featured_image && (
                  <span className="cms-file-info">
                    Current image exists (upload new to replace)
                  </span>
                )}
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Alt Text</label>
              <input
                type="text"
                name="web_featured_image_alt"
                value={formData.web_featured_image_alt}
                onChange={handleChange}
                placeholder="Enter alt text"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Image Title</label>
              <input
                type="text"
                name="web_featured_image_title"
                value={formData.web_featured_image_title}
                onChange={handleChange}
                placeholder="Enter image title"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Caption</label>
              <textarea
                name="web_featured_image_caption"
                value={formData.web_featured_image_caption}
                onChange={handleChange}
                placeholder="Enter caption"
                className="cms-textarea"
                rows="2"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description</label>
              <textarea
                name="web_featured_image_description"
                value={formData.web_featured_image_description}
                onChange={handleChange}
                placeholder="Enter description"
                className="cms-textarea"
                rows="3"
              />
            </div>
          </div>

          {/* Web Title Image */}
          <div className="cms-section">
            <h3 className="cms-section-title">Web Title Image</h3>

            <div className="cms-form-group">
              <label className="cms-label">Web Title Image</label>
              <input
                type="file"
                name="web_title_image"
                onChange={handleChange}
                className="cms-file-input"
                accept="image/*"
              />
              {formData.web_title_image && (
                <span className="cms-file-name">
                  {formData.web_title_image.name}
                </span>
              )}
              {selectedRow?.webTitleImage && !formData.web_title_image && (
                <span className="cms-file-info">
                  Current image exists (upload new to replace)
                </span>
              )}
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Alt Text</label>
              <input
                type="text"
                name="web_title_image_alt"
                value={formData.web_title_image_alt}
                onChange={handleChange}
                placeholder="Enter alt text"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Image Title</label>
              <input
                type="text"
                name="web_title_image_title"
                value={formData.web_title_image_title}
                onChange={handleChange}
                placeholder="Enter image title"
                className="cms-input-field"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Caption</label>
              <textarea
                name="web_title_image_caption"
                value={formData.web_title_image_caption}
                onChange={handleChange}
                placeholder="Enter caption"
                className="cms-textarea"
                rows="2"
              />
            </div>

            <div className="cms-form-group">
              <label className="cms-label">Description</label>
              <textarea
                name="web_title_image_description"
                value={formData.web_title_image_description}
                onChange={handleChange}
                placeholder="Enter description"
                className="cms-textarea"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cms-button-group">
          <button
            className="cms-btn cms-btn-submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          <button
            className="cms-btn cms-btn-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default UpdateCmsBlogList;
