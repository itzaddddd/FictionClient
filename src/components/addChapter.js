import styled from 'styled-components'
import { Card, Typography, Form, Input, Button } from 'antd'

const { Title, Text } = Typography
const { TextArea } = Input

const TitleStyle = styled(Title)`
    text-align: center;
    color: white;
`

const Topic = styled(Card)`
    background-color: #A214CD;
    padding: 0.5em;
    margin: 0 auto;
    margin-top: 2%;
    margin-bottom: 1em;
    border-radius: 1em;
    width: 50%;
`
const FormInputStyle = styled(Form.Item)`
    width: 60%;
    margin: 0 auto;
    &.ant-form-item {
        textArea {
            border-color: #A214CD;
            border-radius: 1em;
            border-width: 0.2em;
        }
    }
`
const FormControlStyle = styled(Form.Item)`
    &.ant-form-item{
        button.ant-btn {
            margin: 0 auto;
            margin-top: 1em;
            display: block;
        }
    }
`
export function AddChapter(){
    
    const onFinish = values => {
        console.log(values)
    }

    const onFinishFailed = error => {
        console.log(error)
    }

    const onReset = () => {
        form.resetFields()
    }

    const [form] = Form.useForm() 
    return(
        <>
            <Topic>
                <TitleStyle style={{color:'white'}}>Add Chapter</TitleStyle>
            </Topic>
            <Card>
                <Form
                    form={form}
                    name={`add-chapter`}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <FormInputStyle name={'content'}>
                        <TextArea rows={22}/>
                    </FormInputStyle>
                    <FormControlStyle>
                        <Button htmlType='button' onClick={onReset}>
                            RESET
                        </Button>
                        <Button 
                            htmlType='submit' 
                            type='primary' 
                            style={{
                                backgroundColor:'#A214CD', 
                                borderColor: '#A214CD',
                                borderRadius: '0.5em'
                            }}>
                            Add Chapter
                        </Button>
                    </FormControlStyle>
                </Form>
            </Card>
        </>
    )
}