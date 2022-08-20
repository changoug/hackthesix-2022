import axios from 'axios';

const url = 'https://api.emailjs.com/api/v1.0/email/send';

const data = {
    service_id: 'service_yu6d39t',
    template_id: 'template_fo9h03c',
    user_id: 'nbO4c5EfFaBq5_cGS',
    accessToken: 'pE9VdWkPfvMo0m9NmFHLH',
    template_params: {
        to_email: to_email,
        subject: subject,
        to_name: to_name,
        message: message,
    }
};

axios.post(url)
.then (data=>console.log(data) )
.catch(err=>console.log(err));