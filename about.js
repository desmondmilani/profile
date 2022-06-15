//function to make things appear on scroll
const toggleStaff = (tag) => {
    const point = window.innerHeight / 2 + 100;

    const tagTop = tag.getBoundingClientRect().top;
    if(tagTop < point && tagTop > 100 ) {
        document.getElementById(tag.id).style.visibility = "visible";
    } else {
        document.getElementById(tag.id).style.visibility = "hidden";
    }
}

window.addEventListener("scroll", () => {
    const hospital = document.getElementById("hospital");
    toggleStaff(hospital);

    const hospitalInfo = document.getElementById("hospital_info");
    toggleStaff(hospitalInfo);

    const primary = document.getElementById("primary");
    toggleStaff(primary);

    const primaryInfo = document.getElementById("primary_info");
    toggleStaff(primaryInfo);

    const highSchool = document.getElementById("high_school");
    toggleStaff(highSchool);

    const highSchoolInfo = document.getElementById("high_school_info");
    toggleStaff(highSchoolInfo);

    const college = document.getElementById("college");
    toggleStaff(college);

    const collegeInfo = document.getElementById("college_info");
    toggleStaff(collegeInfo);
})

