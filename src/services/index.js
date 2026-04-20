export async function addData(currentTab, formData) {
    try {
        const response = await fetch(`/api/${currentTab}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
    }
}

export async function getData(currentTab) {
    try {
        const response = await fetch(`/api/${currentTab}/get`, {
            method: "GET",
        });
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
    }
}

export async function updateData(currentTab, formData) {
    try {
        const response = await fetch(`/api/${currentTab}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
    }
}

export async function login(formData) {
    try {
        const response = await fetch(`/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
    }
}

// ✅ New Function to Fetch a Single Project by ID
export async function getProjectById(projectId) {
    try {
        const response = await fetch(`/api/project/${projectId}`, {
            method: "GET",
        });

        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
    }
}

export async function handleDelete(id){
    try {
        const res = await fetch(`/api/education/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id}),
        });
        return res.json();
    } catch (e) {
        console.error("Error Deleting item",e);
        return { success: false, message: "failed to delete item"}
    }
}
export async function ExperienceDelete(id){
    try {
        const res = await fetch(`/api/experience/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id}),
        });
        return res.json();
    } catch (e) {
        console.error("Error Deleting item",e);
        return { success: false, message: "failed to delete item"}
    }
}
export async function ReviewsDelete(id){
    try {
        const res = await fetch(`/api/reviews/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id}),
        });
        return res.json();
    } catch (e) {
        console.error("Error Deleting item",e);
        return { success: false, message: "failed to delete item"}
    }
}

export async function ServicesDelete(id){
    try {
        const res = await fetch(`/api/services/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id}),
        });
        return res.json();
    } catch (e) {
        console.error("Error Deleting item",e);
        return { success: false, message: "failed to delete item"}
    }
}