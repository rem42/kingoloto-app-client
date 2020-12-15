import axios from 'axios';
import {Grid} from './utils/grid';

export class KingolotoApp {
    private uri = {
        connect: '/login',
        showUser: '/api/show/user',
        play: '/api/games',
    }

    private axiosInstance = axios.create({
        baseURL: 'https://app.kingoloto.com',
        withCredentials: true,
    });
    private idJoueur?: number;

    private constructor(
        private email: string,
        private password: string
    ) { }

    public static async init(email: string, password: string): Promise<KingolotoApp>
    {
        const self = new KingolotoApp(email, password);
        return await self.connect();
    }

    public async playGrid(): Promise<boolean>
    {
        const randomFruit = Math.floor(Math.random() * 10) + 1;
        const goodNumbers = '["' + Grid.generate.join('","') + '"]';
        const postData = JSON.stringify({
            'good_fruit_id': randomFruit.toString(),
            'good_numbers': goodNumbers,
            'id_joueur': this.idJoueur,
        });
        const axiosConfig = {
            headers: {
                'Content-Length': postData.length,
                'Content-Type': 'application/json',
            }};
        return await this.axiosInstance.post(this.uri.play, postData, axiosConfig)
            .then(response => {
                return response.status === 201 && response.data.numero !== 10;
            });
    }

    public userInformations(): void
    {
        const postData = JSON.stringify({
            id: this.idJoueur,
        });
        const axiosConfig = {
            headers: {
                'Content-Length': postData.length,
                'Content-Type': 'application/json',
            }};
        this.axiosInstance.post(this.uri.showUser, postData, axiosConfig)
    }

    private async connect(): Promise<KingolotoApp>
    {
        const postData = JSON.stringify({
            password: this.password,
            username: this.email,
        });
        const axiosConfig = {
            headers: {
            'Content-Length': postData.length,
            'Content-Type': 'application/json',
        }};
        await this.axiosInstance.post(this.uri.connect, postData, axiosConfig)
            .then(response => {
                const data = response.data;

                this.axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + data.token;
                this.idJoueur = data.id_joueur;

                return response.status === 200
            });

        return this;
    }
}
