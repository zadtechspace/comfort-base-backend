const crypto = require ("crypto")

const generateString =(num=6)=>{

    const finalNum = num/2
    const string = crypto.randomBytes(finalNum).toString('hex')

    return string
}

module.exports = generateString