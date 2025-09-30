import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import Carousel from './ui/Carousel';

const TestimonialCard = ({ testimonial }) => (
	<div className="bg-white rounded-2xl p-8 border border-gray-300 h-full min-h-[300px] flex flex-col justify-between">
		<div>
			<div className="flex items-start mb-6">
				<FaQuoteLeft className="text-orange-400 text-3xl mr-4 mt-1" />
				<div className="flex items-center">
					{[...Array(5)].map((_, i) => (
						<FaStar
							key={i}
							className={`text-lg ${
								i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
							}`}
						/>
					))}
				</div>
			</div>
			<p className="text-gray-600 leading-relaxed mb-6 text-lg">
				"{testimonial.feedback || testimonial.review}"
			</p>
		</div>
		<div className="flex items-center">
			<div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
				{testimonial.avatar || getInitials(testimonial.name)}
			</div>
			<div>
				<h4 className="font-semibold text-gray-800 text-lg">
					{testimonial.name}
				</h4>
				<p className="text-gray-500">{testimonial.location || testimonial.address}</p>
			</div>
		</div>
	</div>
);

// Helper function to generate initials
const getInitials = (name) => {
	if (!name) return 'U';
	const nameParts = name.trim().split(' ');
	if (nameParts.length === 1) {
		return nameParts[0].charAt(0).toUpperCase();
	} else {
		return nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
	}
};

const Testimonnal = () => {
	const [testimonials, setTestimonials] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchFeedback();
	}, []);

	const fetchFeedback = async () => {
		try {
			setIsLoading(true);
			console.log('Fetching feedback from API...');
			
			// Use localhost for development
			const apiUrl = 'https://cloth2cash.onrender.com/api/feedback';
				
			console.log('API URL:', apiUrl);
			const response = await fetch(apiUrl);
			
			console.log('Response status:', response.status);
			
			if (response.ok) {
				const feedback = await response.json();
				console.log('Fetched feedback:', feedback);
				
				// Transform feedback to testimonial format
				const transformedFeedback = feedback.map((item, index) => ({
					id: item._id || `feedback-${index}`,
					name: item.name,
					location: item.address,
					rating: item.rating,
					feedback: item.feedback,
					avatar: getInitials(item.name),
					isRealFeedback: true,
					submittedAt: item.submittedAt
				}));

				console.log('Transformed feedback:', transformedFeedback);
				setTestimonials(transformedFeedback);
			} else {
				console.error('Failed to fetch feedback. Status:', response.status);
				const errorText = await response.text();
				console.error('Error response:', errorText);
				setTestimonials([]);
			}
		} catch (error) {
			console.error('Error fetching feedback:', error);
			setTestimonials([]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Section>
			<SectionHeader 
				subtitle="TESTIMONIALS"
				title="What Our Customers Say"
				description="Real feedback from our valued customers who have experienced our service."
			/>

			{isLoading ? (
				<div className="text-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
					<p className="text-gray-600 text-lg">Loading customer feedback...</p>
				</div>
			) : testimonials.length === 0 ? (
				<div className="text-center py-12">
					<div className="max-w-md mx-auto">
						<FaQuoteLeft className="text-gray-300 text-6xl mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-gray-600 mb-2">No Feedback Yet</h3>
						<p className="text-gray-500">
							Be the first to share your experience with our service! 
							Your feedback helps us improve and helps others make informed decisions.
						</p>
					</div>
				</div>
			) : (
				<>
					<div className="text-center mb-6">
						<p className="text-sm text-gray-500">
							Showing {testimonials.length} customer review{testimonials.length !== 1 ? 's' : ''}
						</p>
					</div>
					<Carousel 
						items={testimonials}
						renderItem={(testimonial) => <TestimonialCard testimonial={testimonial} />}
						autoSlide={true}
						slideInterval={5000}
						showDots={true}
					/>
				</>
			)}
		</Section>
	);
};

export default Testimonnal;


