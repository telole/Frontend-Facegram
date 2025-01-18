import { useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../hooks";

function Create() {
    const axios = api();
    const [caption, setCaption] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
        setError(''); 
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setAttachments(files);
        setError(''); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            if (attachments.length === 0) {
                throw new Error('At least one image is required');
            }

            const formData = new FormData();
            formData.append('caption', caption);
            for (let i = 0; i < attachments.length; i++) {
                formData.append('attachments[]', attachments[i]);
            }

            await axios.post('posts', formData);
            setCaption('');
            setAttachments([]);
            alert('Post created successfully!');
            
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
            setError(errorMessage);
            console.error('Error:', errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className="mt-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                    <h5 className="mb-0">Create new post</h5>
                                </div>
                                <div className="card-body">
                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-2">
                                            <label htmlFor="caption">Caption</label>
                                            <textarea
                                                className="form-control"
                                                name="caption"
                                                id="caption"
                                                value={caption}
                                                onChange={handleCaptionChange}
                                                rows="3"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="attachments">Image(s)</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="attachments"
                                                name="attachments[]"
                                                multiple
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Sharing...' : 'Share'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Create;