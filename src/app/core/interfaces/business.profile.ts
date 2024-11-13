export interface BusinessProfile {
    _id: string;
    slogan:string | undefined;
    logo: string;
    titlePage:string;
    address:string;
    email:string;
    phone:string;
    create_date: Date;
    update_date: Date;
}

export interface UpdateBusinessProfile extends Omit<BusinessProfile, '_id' | 'update_date' | 'create_date'> {}
