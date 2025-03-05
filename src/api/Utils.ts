export class Utils {
    private constructor() {
    }
    static getCountryFlagEmoji = (countryCode: string): string => {
        const codePoints = countryCode
            .toUpperCase()
            .split("")
            .map((char) => 127397 + char.charCodeAt(0))
        return String.fromCodePoint(...codePoints)
    }
    static getTextDate(s: string): string {
        if (s.includes("Today")) return s;
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const tmp = s.substring(0, 2);
        s = s.replace(tmp, "").replace("/", "");
        return monthNames[parseInt(tmp) - 1] + " " + s;
    }
    static casi(cusi: string, which: boolean): string {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let cajt = cusi;
        cajt = cajt.substring(0, 10);
        cajt = cajt.replace("-", "").replace("-", "/");
        const leto = cajt.substring(0, 4);
        cajt = cajt.replace(leto, "");
        const mesec = cajt.substring(0, 2);
        const dan = cajt.substring(3, 5);
        const datum = new Date();
        if (which)
            return (monthNames[parseInt(mesec) - 1] + " ") + dan + ("" + datum.getFullYear() != leto ? " " + leto : "");
        if ("" + datum.getFullYear() != leto)
            return (datum.getFullYear() - parseInt(leto)) + "y";
        if (datum.getMonth() + 1 != parseInt(mesec))
            return (datum.getMonth() + 1 - parseInt(mesec)) + "m";
        const day = datum.getDate() - parseInt(dan);
        if (day > 6) return String(Math.floor(day / 7)) + "w";
        if (day > 0) return String(day) + "d";
        const hour = datum.getHours() - parseInt(cusi.substring(11, 13)) + datum.getTimezoneOffset() / 60;
        return (hour > 0) ? String(hour) + "h" : "now";
    }
    static cesi(cusi: string): string {
        let cajt = ""; 3
        const datum = new Date();
        const datum11 = new Date(cusi);
        datum11.setHours(datum11.getHours() - datum.getTimezoneOffset() / 60);
        if (datum.getFullYear() == datum11.getFullYear()) cajt = (datum11.getHours() + 1 < 10 ? "0" : "") + datum11.getHours() + ":" + (datum11.getMinutes() + 1 < 10 ? "0" : "") + datum11.getMinutes();
        //if (datum11.getMonth() == datum.getMonth() && datum11.getDate() == datum.getDate())
        //  cajt += " Today";
        cajt += " " + (datum11.getMonth() + 1 < 10 ? "0" : "") + (datum11.getMonth() + 1) + "/" + (datum11.getDate() < 10 ? "0" : "") + datum11.getDate() + (datum11.getFullYear() != datum.getFullYear() ? " " + datum11.getFullYear() : "");
        return cajt;
    }

    static manageCountSt(a: number): string {
        if (a > 999) {
            let znak;
            if (a < 1000000) {
                a /= 1000;
                znak = "K";
            } else if (a < 1000000000 && a > 999999) {
                a /= 1000000;
                znak = "M";
            } else {
                a /= 1000000000;
                znak = "B";
            }
            let v = String(a).substring(0, 4);
            if (v[3] == ".") v = v.substring(0, 3);
            v += znak;
        }
        return "" + a;
    }

    static isHTML(str: string) {
        var doc = new DOMParser().parseFromString(str, "text/html");
        return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
    }

    static getUserLink(userId: string, gabaId: number, nickname: string): string {
        return userId == "" + gabaId ? `/Profile` : `/user?nick=${nickname}`;
    }

    static isEmail(s: string): boolean {
        const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !s.match(emailFormat);
    }

    static validName(s: string): boolean {
        const nameFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return nameFormat.test(s);
    }

    static validNickame(s: string): boolean {
        const nicknameFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return nicknameFormat.test(s);
    }

    static removeSpaces(c: string): string {
        const tmp = c.trim().split(/ +/).join(' ');
        return tmp;
    }

    static toBase64(file?: File | null): Promise<string | null> {
        return new Promise((resolve, reject) => {
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    if (typeof reader.result === "string") {
                        // Remove before first comma
                        const i = reader.result.indexOf(',');
                        if (-1 === i) {
                            resolve(reader.result);
                            return;
                        }
                        if (i + 1 >= reader.result.length) {
                            resolve(null);
                            return;
                        }
                        const base64Data = reader.result.substring(i + 1);
                        resolve(base64Data);
                    }
                    else
                        resolve(null);
                };
                reader.onerror = reject;
            }
            else
                resolve(null);
        });
    }

    static clone<T>(o: T): T {
        return JSON.parse(JSON.stringify(o));
    }
}