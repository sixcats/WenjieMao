import request from '@/utils/http';
/**
 * Send email function
 *
 * This function sends an email by making an HTTP POST request. It requires the necessary data for sending the email.
 * It uses an authorization token to authenticate the API request, ensuring its validity.
 *
 * @param data Optional parameter containing the information needed for sending the email, such as recipient, subject, and content
 * @returns A Promise object that resolves to an IResponse type containing the response data
 */
export const send = (data?): Promise<IResponse> => {
    return request.post({
        url: '/v3/mail/send',
        data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        }
    });
};
