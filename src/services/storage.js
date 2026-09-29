import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { createSeed } from '../data/seed';
const ACCOUNTS='@minha-lavoura:accounts:v1', SESSION='@minha-lavoura:session:v1';
const key=id=>`@minha-lavoura:farm:${id}:v1`;
async function readAccounts(){return JSON.parse(await AsyncStorage.getItem(ACCOUNTS)||'[]')}
async function hash(password,salt){return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,`${salt}:${password}`)}
export async function getSession(){const raw=await AsyncStorage.getItem(SESSION);if(!raw)return null;const session=JSON.parse(raw);return (await readAccounts()).some(a=>a.id===session.id)?session:null}
export async function login(email,password){const user=(await readAccounts()).find(a=>a.email===email.trim().toLowerCase());if(!user||await hash(password,user.salt)!==user.hash)throw Error('E-mail ou senha incorretos.');const session={id:user.id,name:user.name,email:user.email,farm:user.farm};await AsyncStorage.setItem(SESSION,JSON.stringify(session));return session}
export async function register({name,email,password,farm,demo=false}){name=name.trim();email=email.trim().toLowerCase();if(!name)throw Error('Informe seu nome.');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error('Informe um e-mail válido.');if(password.length<8)throw Error('Use uma senha de pelo menos 8 caracteres.');const accounts=await readAccounts();if(accounts.some(a=>a.email===email))throw Error('Já existe uma conta local com esse e-mail.');const salt=Crypto.randomUUID(),id=Crypto.randomUUID();const account={id,name,email,farm:farm.trim(),salt,hash:await hash(password,salt)};await AsyncStorage.setItem(key(id),JSON.stringify(demo?createSeed():{plots:[],items:[],machines:[],notes:[],tasks:[],moves:[]}));await AsyncStorage.setItem(ACCOUNTS,JSON.stringify([...accounts,account]));return login(email,password)}
export async function demoLogin(){const email='demo@minhalavoura.app',password='lavoura123';if(!(await readAccounts()).some(a=>a.email===email))return register({name:'Agricultor',email,password,farm:'Fazenda Boa Vista',demo:true});return login(email,password)}
export async function logout(){await AsyncStorage.removeItem(SESSION)}
export async function loadFarm(id){const raw=await AsyncStorage.getItem(key(id));if(raw)return JSON.parse(raw);const data=createSeed();await saveFarm(id,data);return data}
export async function saveFarm(id,data){await AsyncStorage.setItem(key(id),JSON.stringify(data))}
export async function updateProfile(user,{name,farm}){if(!name.trim())throw Error('Informe seu nome.');const accounts=await readAccounts(),next={...user,name:name.trim(),farm:farm.trim()};await AsyncStorage.setItem(ACCOUNTS,JSON.stringify(accounts.map(a=>a.id===user.id?{...a,name:next.name,farm:next.farm}:a)));await AsyncStorage.setItem(SESSION,JSON.stringify(next));return next}
