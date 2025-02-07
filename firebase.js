let resume = {
    fullname:"",
    email: "",
    Objective:"",
    personal_details: {},
    certification: [],
    skills: [],
    Marital_Status:[],
    hobbies: [],
    course: [],
    Language_known : [],
    workExperience: [],
    projects:[]
    
}

function add(e, key, p_key) {
    if (p_key) {
        resume[p_key][key] = e.value

    } else {
        resume[key] = e.value

    }
    display_output()
}   
window.add = add

function addArrayValue(key) {
    let value = document.getElementById(key).value;
    resume[key].push(value);
    document.getElementById(key).value = "";
    display_output()
    if(key == "Language_known"){
        update_value("Language_known","list_1")
    }
    else if(key == "skills"){
        update_value("skills","list_2")
    }
    else if(key == "hobbies"){
        update_value("hobbies","list_3")
    }
}

window.addArrayValue= addArrayValue

function addvalue(c_key,key1,key2,key3,key4) {
    let newObj = {};
    if(key4){
    newObj[key1] = document.getElementById(key1).value;
    newObj[key2] = document.getElementById(key2).value;
    newObj[key3] = document.getElementById(key3).value;
    newObj[key4] = document.getElementById(key4).value;
    resume[c_key].push(newObj)
    document.getElementById(key1).value = "";
    document.getElementById(key2).value = "";
    document.getElementById(key3).value = "";
    document.getElementById(key4).value = "";
    update_certification()
    update_course()
    }
    else if(key3){
    newObj[key1] = document.getElementById(key1).value;
    newObj[key2] = document.getElementById(key2).value;
    newObj[key3] = document.getElementById(key3).value;
    resume[c_key].push(newObj)
    document.getElementById(key1).value = "";
    document.getElementById(key2).value = "";
    document.getElementById(key3).value = "";
    update_project()
    update_experience()
    }
    display_output()
}

window.addvalue=addvalue

function display_output() {
    document.getElementById("output").innerHTML = JSON.stringify(resume)
} 


// <!----------------------------------------FIRE-BASE LINK ------------------------------------------->

  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getDatabase,set,get,child,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";


  const firebaseConfig = {
    apiKey: "AIzaSyB86vzEFpZoT40rFtG1M9IE6OU1oYZEjDA",
    authDomain: "resume-details-ef387.firebaseapp.com",
    projectId: "resume-details-ef387",
    storageBucket: "resume-details-ef387.firebasestorage.app",
    messagingSenderId: "242940732787",
    appId: "1:242940732787:web:4f8a1d0aa943a72dd71106"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const name = 'user/'

  const initialDb = ref(db,name)


function createResume(){
    if(resume.fullname == ""){
        alert("please fill the form")
    }
    else{
        push(initialDb,
            {
                fullname: resume?.fullname,
                email: resume?.email,
                Objective: resume?.Objective,
                course: JSON.stringify(resume?.course),
                personal_details : JSON.stringify(resume?.personal_details),
                projects: JSON.stringify(resume?.projects),
                hobbies:JSON.stringify(resume?.hobbies),
                skills:JSON.stringify(resume?.skills),
                Language_known:JSON.stringify(resume?.Language_known),
                workExperience:JSON.stringify(resume?.workExperience),
                certification:JSON.stringify(resume?.certification),
                projects:JSON.stringify(resume?.projects)

            })
            Delete_value()
            alert("Submitted Successfully !")
            window.location.href = "list.html"
            document.getElementById("output").innerHTML = ""
        }
}

window.createResume = createResume


function Delete_value(){
    document.getElementById("fullname").value = ""
    document.getElementById("email").value = ""
    document.getElementById("Objective").value = ""
}

// <!----------------------------------------Get FireBase value------------------------------------------->

            function display(){
                onValue(initialDb,function(snapshot){
                    const data = snapshot.val();
                    let trs = "";

                    if(snapshot.exists()){
                    let userArray =Object.entries(data);
                    let index = 1; 
                    let num= 0 
                    for(let each of userArray){
                    trs = trs + `
                        <tr>
                            <td>${index}</td>
                            <td>${each[1].fullname}</td>
                            <td>${each[1].email}</td>
                            <td>${each[1].Objective}</td>
                            <td>${JSON.parse(each[1].personal_details).contact_number}</td>
                            <td><button class="btn-edit" onclick = 'edit("${each[0]}",${JSON.stringify(each[1])})'>
                                        <ion-icon name="create-outline"></ion-icon>
                                </ button>
                            </td>
                            <td>
                                <button class="btn-delete" onclick = Delete('${each[0]}')>
                                    <ion-icon name="trash-outline" ></ion-icon>
                                </button>
                            </td>
                        </tr>`
                    
                    index++
                    }
                }
                document.getElementById("tBody").innerHTML = trs
                
                })
            }

            window.display= display
            display()

            function update_value(key,id){
                let li_list = ""
                for(let each of resume[key]){
                      li_list = li_list + `<li>${each}<button onclick ='delete_li("${each}","${key}","${id}")'><i class="fa fa-close"></i></button></li>`
                }
                document.getElementById(id).innerHTML = li_list 
            } 
    

            function delete_li(val,key,id){
                let a = []
                for(let each of resume[key]){
                    if(each!=val){
                        a.push(each)
                    }
                }
                resume[key] = a
                update_value(key,id)
            }

            window.delete_li = delete_li


            function delete_table(index,key){
                let a =[]
                let edu = resume[key]
                for(let i in edu){
                    if(i!=index){
                        a.push(edu[i])
                    }
                }
                resume[key] = a
                if(key == "course"){
                    update_course()
                }
                else if(key == "certification"){
                    update_certification()
                }
                else if(key == "projects"){
                    update_project()
                }
                else if(key == "workExperience"){
                    update_experience()
                }
            }

            window.delete_table = delete_table

            function update_course(){
                let li_list = ""
                let course = resume.course
                for(let i=0;i< course.length;i++){
                        li_list = li_list + `<tr>
                                    <td>${course[i].course_name_1}</td>
                                    <td>${course[i].institude_name_1}</td>
                                    <td>${course[i].year_1}</td>
                                    <td>${course[i].place_1}</td>
                                    <td><button onclick = 'delete_table("${i}","course")'>Delete</button></td>
                            </tr>`
                }
                document.getElementById("tbody_3").innerHTML = li_list
            }

            function update_certification(){
                let li_list = ""
                let certification  = resume.certification
                for(let i=0;i<certification.length;i++){
                        li_list = li_list + `<tr>
                                    <td>${certification[i].course_name1}</td>
                                    <td>${certification[i].acadamey_name1}</td>
                                    <td>${certification[i].year_2}</td>
                                    <td>${certification[i].duration_2}</td>
                                    <td><button onclick = 'delete_table("${i}","certification")'>Delete</button></td>                              
                            </tr>`
                }
                document.getElementById("tbody_2").innerHTML = li_list
            }

            function update_project(){
                let li_list = ""
                let project = resume.projects
                for(let i=0;i<project.length;i++){
                        li_list = li_list + `<tr>
                                    <td>${project[i].project_name}</td>
                                    <td>${project[i].company_name}</td>
                                    <td>${project[i].Duration_4}</td>
                                     <td><button onclick = 'delete_table("${i}","projects")'>Delete</button></td>                                                                 
                            </tr>`
                }
                document.getElementById("tbody_1").innerHTML = li_list
            }

            function update_experience(){
                let li_list = ""
                let exp =resume.workExperience
                for(let i=0;i<exp.length;i++){
                        li_list = li_list + `<tr>
                                    <td>${exp[i].company_name_4}</td>
                                    <td>${exp[i].Designation_4}</td>
                                    <td>${exp[i].yoe_3}</td>
                                    <td><button onclick = 'delete_table("${i}","workExperience")'>Delete</button></td>                                                                                                    
                            </tr>`
                }
                document.getElementById("tbody_4").innerHTML = li_list
            }

// <!-----------------------------------------------------EDIT-------------------------------------------------------- -->

            function edit(id,dataString){
                resume.fullname = dataString.fullname;
                resume.email = dataString.email;
                resume.Objective =  dataString.Objective;
                document.querySelector("#fullname").value = resume.fullname
                document.querySelector("#email").value = resume.email  
                document.querySelector("#Objective").value = resume.Objective 

                document.querySelector("#id").value = id     


                const{father_name,mother_name,dob,Gender,address,contact_number,Marital_Status} = JSON.parse(dataString.personal_details)


                resume.personal_details.father_name = father_name
                resume.personal_details.mother_name = mother_name
                resume.personal_details.dob = dob
                resume.personal_details.Gender = Gender
                resume.personal_details.address = address
                resume.personal_details.contact_number  = contact_number
                resume.personal_details.Marital_Status = Marital_Status

                document.querySelector("#father_name").value = father_name
                document.querySelector("#mother_name").value = mother_name
                document.querySelector("#dob").value = dob
                document.querySelector("#address").value = address
                document.querySelector("#contact_number").value = contact_number

                if(Gender == "Male"){
                    document.getElementById("male_Gender").checked = true;
                }else{
                    document.getElementById("female_Gender").checked = true;
                }
                



                let language_value = JSON.parse(dataString.Language_known)
                resume.Language_known = language_value
                update_value("Language_known","list_1")

                let skill_value = JSON.parse(dataString.skills)
                resume.skills = skill_value
                update_value("skills","list_2")

                let hobbie_value = JSON.parse(dataString.hobbies)
                resume.hobbies = hobbie_value
                update_value("hobbies","list_3")


                let project_value = JSON.parse(dataString.projects)
                resume.projects = project_value
                update_project()

                let certification_value = JSON.parse(dataString.certification)
                resume.certification = certification_value
                update_certification()

                let course_value = JSON.parse(dataString.course)
                resume.course = course_value
                update_course()
            
                let workexperience_value = JSON.parse(dataString.workExperience)
                resume.workExperience = workexperience_value
                update_experience()

               
            }

            window.edit = edit
                
            // <!-----------------------------------------------------Update-------------------------------------------------------- -->

            function updateResume(){
                let id = document.querySelector("#id").value;
                let Language_known = JSON.stringify(resume.Language_known)
                let skills = JSON.stringify(resume.skills)
                let hobbies = JSON.stringify(resume.hobbies)
                let course = JSON.stringify(resume.course)
                let certification = JSON.stringify(resume.certification)
                let project = JSON.stringify(resume.projects)
                let workExperience = JSON.stringify(resume.workExperience)


                set(ref(db,"user/" + id),{
                    fullname : resume.fullname,
                    email: resume.email,
                    Objective : resume.Objective,
                    personal_details : JSON.stringify(resume.personal_details),
                    Language_known: Language_known,
                    skills: skills,
                    hobbies : hobbies,
                    course:course,
                    projects:project,
                    certification:certification,
                    workExperience:workExperience
                })
                alert("Successfully Updated")
                Delete_inputValue()
                display()
            }

                window.updateResume = updateResume;


            function Delete_inputValue(){
                document.querySelector("#fullname").value = ""
                document.querySelector("#email").value = ""
                document.querySelector("#father_name").value = ""
                document.querySelector("#mother_name").value  = ""
                document.querySelector("#address").value  = ""
            }




            function Delete(id){
                alert("Are you sure to Delete?")
                let data =  ref(db,`user/${id}`);
                remove(data);
            }

            window.Delete = Delete






