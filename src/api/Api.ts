export class Api {
    url: string;
    userId: string;
    //authorization: string | null;

    constructor() {
        this.url = "http://localhost/index.php/";
        //this.authorization = localStorage.getItem("authorization") || null;
        this.userId = localStorage.getItem("userId") || "";
    }

    private async getStatement(extra: string) {
        try {
            const res = await fetch(this.url + extra, {
                method: "GET",
                /*headers: {
                    "Authorization": this.authorization || ""
                }*/
            });
            const json = await res.json();
            if (res.ok)
                return json;
            if (json.message)
                throw json.message;
            throw "Unknown error";
        }
        catch (e) {
            console.error(e);
        }
    }

    async getCustomers(): Promise<Customer[]> {
        //Gets posts
        return this.getStatement("user/list?limit=20");
    }
}

export interface User {
    name: string;
    age: number;
}

export interface Customer {
    customerNumber: number;
    customerName: string;
    contactLastName: string;
    contactFirstName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    salesRepEmployeeNumber: string;
    creditLimit: string;
}

export interface Employe {
    employeeNumber: number;
    lastName: string;
    firstName: string;
    extension: string;
    email: string;
    officeCode: string;
    reportsTo: string;
    jobTitle: string;
}