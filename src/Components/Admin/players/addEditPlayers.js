import React,{useEffect,useState} from 'react';
import AdminLayout from '../../HOC/Adminlayout';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toastError,toastSuccess, errorFormLabel, selectError,selectErrorText } from '../../Utils/tools';
import { TextField,Select,MenuItem,FormControl,Button } from '@mui/material';

import { playersCollection, firebase } from '../../../firebase';
import Fileuploader from '../../Utils/fileUploader';
import { FormatLineSpacing } from '@mui/icons-material';


let defaultValue = {
    name:'',
    lastname:'',
    number:'',
    position:'',
    image:''
}

const AddEditPlayers = ()=>{

    const [values,setValue] = useState(defaultValue);
    const [formType,setFormType] = useState('');
    const {playerid}  = useParams();
    const [loading, setLoading] = useState(false);
    const [defaultImgURL, setDefaultImgURL] = useState('')
 
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:values,
        validationSchema:Yup.object({
            name:Yup.string()
                    .required('Name is required'),
            lastname:Yup.string()
                        .required('Last name is required'),
            number:Yup.number()
                      .min(0,'Jersey number should be greater than zero')
                      .max(99,'Number should be less than 100')
                      .required('Jersey number is required'),
            position:Yup.string().required('Player position is required'),
            image:Yup.string().required("Image is required")
            }),
        onSubmit:(values) =>{
            submitForm(values)
        }

    })

    const submitForm = (values)=>{
        let dataToSubmit = values;
        setLoading(true);
        if(formType==='add'){
            playersCollection.add(dataToSubmit)
                             .then(()=>{
                                toastSuccess("Player Added");
                                formik.resetForm();
                             })
                             .catch(error=>{
                                console.log(error);
                                })
        }else{
            playersCollection.doc(playerid).update(dataToSubmit)
                .then(()=>{
                        toastSuccess("Player updated")
                }).catch(error=>{toastError(error)}
                ).finally(()=>{setLoading(false)})

        }
    }

    useEffect(()=>{

        if(playerid){
            console.log(playerid);
            playersCollection.doc(playerid).get()
                .then(snapshot =>{
                    if(snapshot.data()){
                        firebase.storage().ref('players')
                                .child(snapshot.data().image).getDownloadURL()
                                .then((url) =>{
                                    handleImageFilename(snapshot.data().image);
                                    setDefaultImgURL(url);                                 
                                }).catch(error=> {toastError(error)});
                        setFormType('edit');
                        setValue(snapshot.data());

                    }else{
                        toastError("Data not found");
                    }

                }).catch(error => {toastError(error)})
            
        }else{
            setFormType('add');
            setValue(defaultValue);
        }
    },[playerid])

    const handleImageFilename = (filename)=>{
        formik.setFieldValue('image',filename);
    }

    const resetImage = ()=>{
        formik.setFieldValue('image','');
        setDefaultImgURL('');

    }

    return(
        <AdminLayout title={formType === 'add'? 'Add player' : 'Edit player'}>
            <div className='editplayers_dialog_wrapper'>
                <div>
                    <form onSubmit={formik.handleSubmit}> 
                        <FormControl>
                            <Fileuploader 
                                dir='players' 
                                filename={(filename)=>{handleImageFilename(filename)}}
                                defaultImgName={formik.values.image}
                                defaultImgURL={defaultImgURL}
                                resetImage = {()=>resetImage()}/>  
                                {/* File uploader Component */}
                        </FormControl>
                        <hr/>
                        <h4>Player info</h4>
                        <div className='mb-10'>
                            <FormControl>
                               <TextField 
                                        id="name"
                                        name="name"
                                        variant='outlined'
                                        placeholder='Firstname*'
                                        label='Firstname*'
                                        {...formik.getFieldProps('name')}
                                        {...errorFormLabel(formik,'name')}
                                        >
                                </TextField>
                            </FormControl>
                        </div>
                        <div className='mb-10'>
                            <FormControl>
                               <TextField 
                                        id="lastname"
                                        name="lastname"
                                        variant='outlined'
                                        placeholder='Lastname*'
                                        label="Lastname*"
                                        {...formik.getFieldProps('lastname')}
                                        {...errorFormLabel(formik,'lastname')}
                                        >
                                </TextField> 
                            </FormControl>
                        </div>
                        <div className='mb-10'>
                            <FormControl>
                               <TextField 
                                        type='number'
                                        id="number"
                                        name="number"
                                        variant='outlined'
                                        label='Jersey Number*'
                                        {...formik.getFieldProps('number')}
                                        {...errorFormLabel(formik,'number')}
                                        >
                                </TextField> 
                            </FormControl>
                        </div>
                        <div className='mb-5'>
                            <FormControl error={selectError(formik,'position')}>
                               <Select
                                    id="position"
                                    name="position"
                                    placeholder='Select a position*'
                                    displayEmpty
                                    {...formik.getFieldProps('position')}
                                    >

                                    <MenuItem value=''>Select a position</MenuItem>
                                    <MenuItem value='Keeper'>Keeper</MenuItem>
                                    <MenuItem value='Defence'>Defender</MenuItem>
                                    <MenuItem value='Midfeild'>Midfeild</MenuItem>
                                    <MenuItem value='Striker'>Striker</MenuItem>
                                </Select> 

                                {selectErrorText(formik,'position')}

                            
                            </FormControl>
                        </div>
                        <Button type='submit' 
                                color='primary' 
                                variant='contained'
                                disabled={loading}>
                        {formType==='add'? 'Add player':'Edit player'}
                        
                        </Button>
                    </form>
                </div>
            </div>

        </AdminLayout>
    )
}

export default AddEditPlayers;
