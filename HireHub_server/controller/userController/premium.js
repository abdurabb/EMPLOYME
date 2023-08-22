const Premium = require('../../models/PremiumPlan')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../../models/User')


// Getting Premium Data 
const getPremium = async (req, res) => {
    try {
        const premiumData = await Premium.find({ isActive: true })
        if (premiumData) {
            return res.status(200).json({
                success: true,
                messege: 'success',
                data: premiumData
            })
        }

    } catch (err) {
        return res.status(400).json({
            success: false,
            error: 'Somethig Wrong'
        })
    }
}


//  user Payment Function After Selecting the Premium
const checkOut = async (req, res) => {
    try {
        const jobId = req.body.values.jobId
        const planId = req.body.values.selectedPlan
        const plan = await Premium.findOne({ _id: planId })
        // Assuming you have the correct price ID for the product you want to sell
        const priceId = plan.planPrice
       

        if (jobId && jobId.length > 4) {
            
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'INR', // Replace 'inr' with your desired currency code
                            unit_amount: priceId * 100, // Convert price to smallest currency unit (e.g., cents)
                            product_data: {
                                name: 'Trainer Selection', // Replace with the name of the product or description
                            },
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}/jobApply?session_id={CHECKOUT_SESSION_ID}&planId=${planId}&jobId=${jobId}`,
                cancel_url: `${process.env.CLIENT_URL}/planList`,
            });

            res.json({ url: session.url })
        }else {

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'INR', // Replace 'inr' with your desired currency code
                            unit_amount: priceId * 100, // Convert price to smallest currency unit (e.g., cents)
                            product_data: {
                                name: 'Trainer Selection', // Replace with the name of the product or description
                            },
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}/profile?session_id={CHECKOUT_SESSION_ID}&planId=${planId}`,
                cancel_url: `${process.env.CLIENT_URL}/planList`,
            });

            res.json({ url: session.url })
        }



    } catch (err) {
        console.error('Error creating checkout session:', err);
        res.status(500).json({ error: 'Failed to create checkout session.' });
    }
};

// Chekking the payment confirmation and update database if payment Successfull
const confirm = async (req, res) => {
    try {
        const sessionId = req.body.sessionId
        const userId = req.body.userId
        const planId = req.body.planId

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
            const plan = await Premium.findOne({ _id: planId })
            if (plan) {
                const currentDate = new Date();
                const planEndingDate = new Date(currentDate);

                switch (plan.planDuration.unit) {
                    case 'months':
                        planEndingDate.setMonth(currentDate.getMonth() + plan.planDuration.value);
                        break;
                    case 'years':
                        planEndingDate.setFullYear(currentDate.getFullYear() + plan.planDuration.value);
                        break;
                    case 'days':
                        planEndingDate.setDate(currentDate.getDate() + plan.planDuration.value);
                        break;
                    default:
                        return res.status(400).json({ error: 'Invalid plan duration unit.' });
                }


                const user = await User.findByIdAndUpdate({ _id: userId },
                    {
                        $set: {
                            hasPlan: true,
                            planEndingDate: planEndingDate

                        }
                    }
                )

                if (user) {
                    return res.status(200).json({
                        success: true,
                        messege: 'Succesfully Completed Payment'
                    })
                }
            } else {
                return res.status(400).json({ error: 'Invalid Payment.' });
            }
        } else {
            return res.status(400).json({ error: 'Invalid Payment.' });
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid Payment.' });
    }

}

module.exports = {
    getPremium, checkOut, confirm
}