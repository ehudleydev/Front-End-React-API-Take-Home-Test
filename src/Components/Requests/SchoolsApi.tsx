import {AnyPtrRecord} from "dns";

const fetchSchool = async(schoolID : string) => {
    try {
        return fetch(`https://api.cps.edu/schoolprofile/CPS/SchoolComparison?SchoolIDs=${schoolID}`)
            .then(data => data.json())
            .then((json) => {
                return json[0]
            });
    } catch (e) {
        console.log(e);
    }
}

const fetchSchools = async(schoolIDs : string[]) => {
    const data : any = {};
    try {
        const promises = await schoolIDs.map(schoolID => fetch(`https://api.cps.edu/schoolprofile/CPS/SchoolComparison?SchoolIDs=${schoolID}`))

        return await Promise
            .all(promises)
            .then(results => Promise.all(results.map(r => r.json())))
            .then((results) => {
                results.forEach((item : any, index : any) => {
                    data[item[0].SchoolID] = item[0];
                    return data
                });
                return data;
            })
    } catch (e) {
        console.log(e);
    }

}

export {fetchSchool, fetchSchools};