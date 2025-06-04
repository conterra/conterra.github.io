export class NewsPageController {
    public formatRepositoryName(name: string): string {
        return name.replace(/-/g, ' ').replace(/mapapps/g, '');
    }

    public getDate(pushDate: string): string {
        const date = new Date(pushDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}.${month}.${year}`;
    }
}