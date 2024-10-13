import request from '@/utils/http';
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