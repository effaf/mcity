import React,{useEffect,useState} from "react";
import AdminLayout from "../../HOC/Adminlayout";
import {useFormik} from 'formik';
import * as Yup from 'yup';

import { toastError, toastSuccess,
         errorFormLabel, selectError,selectErrorText } from "../../Utils/tools";

import { TextField,Select,MenuItem,FormControl,Button } from '@mui/material';

import { matchesCollection, teamsCollection } from "../../../firebase";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const defaultValue = {
    date:'',
    local:'',
    resultLocal:'',
    away:'',
    resultAway:'',
    referee:'',
    stadium:'',
    result:'',
    final:''

}


const AddEditMatches = (props)=>{

    const [loading,setLoading] =  useState(false);
    const [formType, setFormType] = useState('');
    const [teams, setTeams] = useState(null);
    const {matchid} = useParams()
    const [values, setValues] = useState(defaultValue);

    const showTeams = ()=>{
        return (teams ? 
            teams.map((item) => (
                <MenuItem key={item.id} value={item.shortName}>
                    {item.shortName}
                </MenuItem>

            ))
            :null
        )}
    


    useEffect(()=>{
        // Get teams from the database as soon as the page loads
        // Update the teams to the fetched data using hooks
        if(!teams){
            teamsCollection.get().then(snapshot =>{
                const listOfTeams = snapshot.docs.map((doc)=> ({
                  id:doc.id,
                  ...doc.data()  
                }));
                setTeams(listOfTeams);

            }

            ).catch(error =>{
                toastError(error)
            })
        }
    },[teams])

    useEffect(()=>{

        if(matchid){

            //edit mode
            matchesCollection.doc(matchid)
                             .get()
                             .then(snapshot =>{
                                if(snapshot){
                                    setFormType('edit');
                                    setValues(snapshot.data());

                                }else{  
                                    toastError("No records found");
                                }

                             }).catch(error=>{
                                toastError(error);
                             })


        }else{
            //add mode
            setFormType('add');
            setValues(defaultValue);


        }

    },[])

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:values,
        validationSchema:Yup.object({
            date:Yup.string().required("Date is required"),
            local:Yup.string().required('This input is required'),
            resultLocal:Yup.number().required('This input is required')
                           .min(0,"Goals cannot be less than zero")
                           .max(20,"Goals cannot be more than 20"),
            away:Yup.string().required("This input is required"),
            resultAway:Yup.number().required('This input is required')
                           .min(0,"Goals cannot be less than zero")
                           .max(20,"Goals cannot be more than 20"),
            referee:Yup.string(),
            stadium:Yup.string().required("Stadium is required"),
            result:Yup.mixed().required().oneOf(['W','D','L','n/a']),
            final:Yup.mixed().required().oneOf(['Yes','No',''])

        }),
        onSubmit:(values) =>{
            submitForm(values);
        }
    })

    const submitForm =(values) => {
        let dataToSubmit = values;
        teams.forEach((team)=>{
            if(team.shortName === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb;
            }
            if(team.shortName === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb;
            }
        })

        setLoading(true);
        if(formType === 'add'){
            matchesCollection.add(dataToSubmit)
                             .then(()=>{
                                toastSuccess("Match added");
                                formik.resetForm();
                             }).catch(error=>{
                                toastError("Oops something went wrong");
                             }).finally(()=>{
                                setLoading(false);
                             })
        }else{
            matchesCollection.doc(matchid)
                             .update(dataToSubmit)
                             .then(()=>{
                                toastSuccess("Update Successful")
                             }).catch(error => {
                                toastError("Something went wrong");
                             }).finally(()=>{
                                setLoading(false);
                             })
        }
    }

    

    return(
        <AdminLayout title={formType === 'add' ? 'Add Match' :'Edit Match'}>
            <div className="editmatch_dialog_wrapper">
                <div>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <h4>Select Date</h4>
                                <FormControl>
                                    <TextField id ="date" 
                                               name='date' type="date"
                                               {...formik.getFieldProps('date')} 
                                               {...errorFormLabel(formik,'date')}>

                                    </TextField>
                                </FormControl>
                                <hr/>
                                <div>
                                    <h4>Result local</h4>
                                    <FormControl error={selectError(formik,'local')}>
                                        <Select id="local" name="local"
                                                variant="outlined"
                                                displayEmpty 
                                                {...formik.getFieldProps('local')}>
                                            <MenuItem value='' disabled>Select a team</MenuItem>
                                            {showTeams()}
                                        </Select>
                                        {selectErrorText(formik,'local')}
                                    </FormControl>

                                    <FormControl style={{marginLeft:'10px'}}>
                                        <TextField id ="resultLocal" 
                                               name='resultLocal' type="number"
                                               {...formik.getFieldProps('resultLocal')} 
                                               {...errorFormLabel(formik,'resultLocal')}
                                               variant="outlined">

                                        </TextField>
                                    </FormControl>
                                </div>

                                <div>
                                    <h4>Result away</h4>
                                    <FormControl error={selectError(formik,'away')}>
                                        <Select id="away" name="away"
                                                variant="outlined"
                                                displayEmpty 
                                                {...formik.getFieldProps('away')}>
                                            <MenuItem value='' disabled>Select a team</MenuItem>
                                            {showTeams()}
                                        </Select>
                                        {selectErrorText(formik,'away')}
                                    </FormControl>

                                    <FormControl style={{marginLeft:'10px'}}>
                                        <TextField id ="resultAway" 
                                               name='resultAway' type="number"
                                               {...formik.getFieldProps('resultAway')} 
                                               {...errorFormLabel(formik,'resultAway')}
                                               variant="outlined">

                                        </TextField>
                                    </FormControl>
                                </div>
                                <hr/>

                                <div>
                                <h4>Match info</h4>
                                <div className="mb-5">
                                    <FormControl>
                                        <TextField id ="referee" 
                                                name='referee' type="referee"
                                                placeholder="Add a referee name"
                                                {...formik.getFieldProps('referee')} 
                                                {...errorFormLabel(formik,'referee')}>

                                        </TextField>
                                    </FormControl>
                                </div>
                                <div className="mb-5">
                                    <FormControl>
                                        <TextField id ="stadium" 
                                                name='stadium' type="stadium"
                                                placeholder="Add a stadium name"stadium
                                                {...formik.getFieldProps('stadium')} 
                                                {...errorFormLabel(formik,'stadium')}>

                                        </TextField>
                                    </FormControl>
                                </div>
                                <div className="mb-5">
                                        <FormControl error={selectError(formik,'result')}>
                                            <Select id="result" name="result"
                                                    variant="outlined"
                                                    displayEmpty 
                                                    {...formik.getFieldProps('result')}>
                                                <MenuItem value='' disabled>Select result</MenuItem>
                                                <MenuItem value='W'>Win</MenuItem>
                                                <MenuItem value='L'>Lose</MenuItem>
                                                <MenuItem value='D' >Draw</MenuItem>
                                                <MenuItem value='n/a'>No result</MenuItem>
                                            </Select>
                                            {selectErrorText(formik,'result')}
                                        </FormControl>
                                </div>
                                <div className="mb-5">
                                        <FormControl error={selectError(formik,'final')}>
                                            <Select id="final" name="final"
                                                    variant="outlined"
                                                    displayEmpty 
                                                    {...formik.getFieldProps('final')}>
                                                <MenuItem value='' disabled>Was the game played</MenuItem>
                                                <MenuItem value='Yes'>Yes</MenuItem>
                                                <MenuItem value='No'>No</MenuItem>
                                            </Select>
                                            {selectErrorText(formik,'final')}
                                        </FormControl>
                                </div>
                            </div>
                            
                           
                            </div>
                            <Button type='submit' 
                                    color='primary' 
                                    variant='contained'
                                    disabled={loading} >
                                {formType === 'add' ? 'Add match' : 'Edit Match'}
                            </Button> 
                        </form>
                    </div>
                </div>

            </div>
        </AdminLayout>

    ) 
}

export default AddEditMatches;