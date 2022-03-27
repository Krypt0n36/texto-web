
import CryptoJS from "crypto-js";
import {JSEncrypt} from 'jsencrypt';




function generateRSAKeyPairSync(){
    const crypt = new JSEncrypt({default_key_size:2048});
    const KeyPair = {
        publicKey:crypt.getPublicKey(),
        privateKey:crypt.getPrivateKey()
    }
    return KeyPair;
}


function generateRSAKeyPair(callback){
    const crypt = new JSEncrypt({default_key_size:2048});
    const KeyPair = {
        publicKey:crypt.getPublicKey(),
        privateKey:crypt.getPrivateKey()
    }
    callback(KeyPair.privateKey, KeyPair.publicKey);
}


function deriveRSAPublicKey(privateKey){
    // Derive public key from private key
    // to add in future version
    const crypt = new JSEncrypt({default_key_size:2048});
    crypt.setPrivateKey(privateKey);
    return crypt.getPublicKey();
}

function encryptAES(raw_data, key){
    const iv = CryptoJS.lib.WordArray.random(16).toString();
    const encrypted_data = CryptoJS.AES.encrypt(raw_data, CryptoJS.enc.Utf8.parse(key), {
        iv:CryptoJS.enc.Utf8.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return iv+'.'+encrypted_data;
}


function decryptAES(packet, key){
    const [iv, encrypted_data] = packet.split('.');
    var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(encrypted_data)
    });
    const raw_data = CryptoJS.AES.decrypt(cipherParams, CryptoJS.enc.Utf8.parse(key), {
        iv:CryptoJS.enc.Utf8.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    })
    return raw_data.toString(CryptoJS.enc.Utf8);
}

function hashSHA256(data){
    return CryptoJS.SHA256(data).toString();
}

export {
    generateRSAKeyPair,
    encryptAES,
    decryptAES,
    hashSHA256,
    deriveRSAPublicKey
}
