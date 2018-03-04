declare const Buffer: any
declare const console: any

import * as ip from 'ip'
import { Callback, CloudFrontRequestEvent, Context } from 'aws-lambda'

export const handler = (event: CloudFrontRequestEvent, context: Context, callback: Callback) => {
    const request = event.Records[0].cf.request
    const errorContent = '\
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">\
<html><head>\
<title>401 Authorization Required</title>\
</head><body>\
<h1>Authorization Required</h1>\
<p>This server could not verify that you are authorized to access the document\
requested.  Either you supplied the wrong credentials (e.g., bad password), or your\
browser doesn\'t understand how to supply the credentials required.</p>\
</body></html>\
';
    const allowCidrSubnets = [
        'cidr1',
        'cidr2'
    ];
    allowCidrSubnets.forEach(subnet => {
        if (ip.cidrSubnet(subnet).contains(request.clientIp)) {
            console.log('subnet: ' + subnet + ', request.clientIp: ' + request.clientIp)
            callback(null, request);
        }
    })

    const credentials = [
        {
            'user':'hoge',
            'password':'fuga'
        }
    ]

    var authorities = request.headers.Authorization || request.headers.authorization;
    if (authorities) {
        let authorized = false;
        credentials.forEach(credential => {
            const secret = new Buffer(credential.user + ':' + credential.password).toString('base64');
            for (let i = 0; i < authorities.length; i++) {
                if (authorities[i].value.split(" ")[1] === secret) {
                    authorized = true;
                }
            }
        })
        if (authorized) {
            console.log("match: " + authorities);
            callback(null, request);
        }
        else {
            console.log("not match: " + authorities);
            callback(null, {
                status: '403',
                statusDescription: '403 Forbidden',
                headers: {
                    'content-type': [{ key: 'Content-Type', value: 'text/html; charset=UTF-8' }]
                },
                body: errorContent.toString()
            });
        }
    }
    else {
        callback(null, {
            status: '401',
            statusDescription: '401 Unauthorized',
            headers: {
                'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }]
            }
        });
    }
};

