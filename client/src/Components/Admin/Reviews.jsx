import React, { useEffect, useState } from "react";
import {
  fetchDataFromApi,
  postDataToApi,
  removeDataFromApi,
} from "../../API/api";

const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [reviewId, setReviewId] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewWords, setReviewWords] = useState("");
  const [productId, setProductId] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const result = await fetchDataFromApi("/api/reviews");
      setReviews(result.data || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  const filteredReviews = reviews
    .map((item) => {
      const attr = item.attributes || {};
      return {
        id: item.id,
        reviewerEmail: attr.reviewer_email,
        reviewerName: attr.reviewer_name,
        reviewWords: attr.review_words,
        productId: attr.product_id,
      };
    })
    .filter((item) =>
      Object.values(item).some((val) =>
        val !== null && val !== undefined
          ? val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          : false
      )
    );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await removeDataFromApi(`/api/reviews/${id}`);
      alert("Review deleted successfully.");
      fetchReviews();
    } catch (error) {
      alert("Failed to delete the review.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showEditForm) {
      await removeDataFromApi(`/api/reviews/${reviewId}`);
    }

    try {
      const formData = {
        reviewer_email: reviewerEmail,
        reviewer_name: reviewerName,
        review_words: reviewWords,
        product_id: Number(productId),
      };

      let { data } = await postDataToApi("/api/reviews", formData, false);
      if (data) {
        alert("Review submitted successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEditClick = (item) => {
    setReviewerEmail(item.reviewerEmail);
    setReviewerName(item.reviewerName);
    setReviewWords(item.reviewWords);
    setProductId(item.productId);
    setReviewId(item.id);
    setShowEditForm(true);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowEditForm(false);
    setReviewerEmail("");
    setReviewerName("");
    setReviewWords("");
    setProductId("");
    setReviewId("");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Review
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {[
              "Reviewer Email",
              "Reviewer Name",
              "Review Words",
              "Product ID",
              "Actions",
            ].map((head) => (
              <th
                key={head}
                className="border border-gray-300 px-4 py-2 bg-gray-100 text-left"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredReviews.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No reviews found.
              </td>
            </tr>
          )}
          {filteredReviews.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.reviewerEmail}</td>
              <td className="border px-4 py-2">{item.reviewerName}</td>
              <td className="border px-4 py-2">{item.reviewWords}</td>
              <td className="border px-4 py-2">{item.productId}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mt-[300px] w-full max-w-xl relative">
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-center">
              {showEditForm ? "Edit Review" : "New Review"}
            </h2>
            <form onSubmit={handleSubmit}>
              {[
                {
                  label: "Reviewer Email",
                  value: reviewerEmail,
                  onChange: setReviewerEmail,
                  type: "email",
                },
                {
                  label: "Reviewer Name",
                  value: reviewerName,
                  onChange: setReviewerName,
                  type: "text",
                },
                {
                  label: "Review Words",
                  value: reviewWords,
                  onChange: setReviewWords,
                  type: "textarea",
                },
                {
                  label: "Product ID",
                  value: productId,
                  onChange: setProductId,
                  type: "number",
                },
              ].map(({ label, value, onChange, type }) => (
                <div key={label} className="mb-2">
                  <label>{label}</label>
                  {type === "textarea" ? (
                    <textarea
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    />
                  ) : (
                    <input
                      type={type}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    />
                  )}
                </div>
              ))}
              <div className="text-center">
                <input
                  type="submit"
                  value="Submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-700"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewManager;
