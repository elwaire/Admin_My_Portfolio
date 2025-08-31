export const dataNavLink = [
    { label: "About", path: "/" },
    { label: "Certificates Manage", path: "/certificate" },

    { label: "Projects Manage", path: "/project" },
    { label: "Add Project", path: "/project/add" },
];

const PATHS = {
    ABOUT: dataNavLink[0].path,
    CERTIFICATE: dataNavLink[1].path,

    PROJECT: dataNavLink[2].path,
    PROJECT_ADD: dataNavLink[3].path,
};

export default PATHS;
