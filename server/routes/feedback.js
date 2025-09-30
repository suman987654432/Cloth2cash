const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST - Submit feedback
router.post('/', async (req, res) => {
    try {
        console.log('Received feedback submission:', req.body);
        
        const { name, address, feedback, rating, userId, userEmail } = req.body;

        // Validate required fields
        if (!name || !address || !feedback || !rating) {
            console.log('Validation failed - missing required fields');
            return res.status(400).json({ 
                message: 'Name, address, feedback, and rating are required',
                received: { name: !!name, address: !!address, feedback: !!feedback, rating: !!rating }
            });
        }

        // Validate rating range
        if (rating < 1 || rating > 5) {
            console.log('Validation failed - invalid rating:', rating);
            return res.status(400).json({ 
                message: 'Rating must be between 1 and 5' 
            });
        }

        const newFeedback = new Feedback({
            name: name.trim(),
            address: address.trim(),
            feedback: feedback.trim(),
            rating: parseInt(rating),
            userId,
            userEmail,
            isApproved: true, // Auto-approve for now
            submittedAt: new Date()
        });

        console.log('Attempting to save feedback:', newFeedback);
        const savedFeedback = await newFeedback.save();
        console.log('Feedback saved successfully:', savedFeedback._id);
        
        res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            feedback: savedFeedback
        });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to submit feedback',
            error: error.message 
        });
    }
});

// GET - Get all approved feedback for display
router.get('/', async (req, res) => {
    try {
        console.log('Fetching feedback...');
        const feedback = await Feedback.find({ isApproved: true })
            .sort({ submittedAt: -1 })
            .select('name address feedback rating submittedAt');
        
        console.log(`Found ${feedback.length} feedback entries`);
        res.json(feedback);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ 
            message: 'Failed to fetch feedback',
            error: error.message 
        });
    }
});

// GET - Get all feedback (admin use)
router.get('/all', async (req, res) => {
    try {
        const feedback = await Feedback.find()
            .sort({ submittedAt: -1 });
        
        res.json(feedback);
    } catch (error) {
        console.error('Error fetching all feedback:', error);
        res.status(500).json({ 
            message: 'Failed to fetch feedback',
            error: error.message 
        });
    }
});

// PATCH - Approve or reject feedback (admin use)
router.patch('/:id/approve', async (req, res) => {
    try {
        const { id } = req.params;
        const { isApproved } = req.body;

        const updatedFeedback = await Feedback.findByIdAndUpdate(
            id,
            { isApproved },
            { new: true }
        );

        if (!updatedFeedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.json({
            message: `Feedback ${isApproved ? 'approved' : 'rejected'} successfully`,
            feedback: updatedFeedback
        });
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).json({ 
            message: 'Failed to update feedback',
            error: error.message 
        });
    }
});

module.exports = router;
