// const { default: axios } = require("axios")

const callServer = {
    request: async (method, url, body, success, error) => {
        // alert(global.auth)
        let config = {
            method: method,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                'auth': global.auth,
            })
        }

        if (body !== "") {
            let newBody = JSON.stringify(body)
            
            config = { ...config, body: newBody }
        }
         console.log("URL-->", url, JSON.stringify(body),+'--'+global.auth)
        await fetch(url, config)
            .then(processResponse)
            .then(result => {
                 console.log("callServer", result)
                success(result);

            }).catch(err => {
                console.log("Error", err,url)
                error(err);
            })

    },

}

function processResponse(response) {
    // console.log("Response", response)
    const statusCode = response.status;
    if (statusCode == 200) {
        const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
            code: res[0],
            data: res[1]
        }));
    }
    else if (statusCode == 401)
    
        return Promise.all([statusCode]).then(res => ({
            code: 401
        }));
    else
        throw new Error('Server issue')
    // return Promise.all([statusCode]).then(res => ({
    //     code: 500
    // }));

}

module.exports = callServer;