"use client"
import React, {useContext, useMemo, useState} from 'react'
import dynamic from 'next/dynamic'
import "react-quill/dist/quill.snow.css"
import axios from "axios"


const TextEditor = () => {
    const DynamicEditor = useMemo(()=>{
        return dynamic(()=> import('react-quill'), {
            ssr:false,
            loading: ()=> <p>Loading...</p>
        })
    }, []);

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
          ],
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          }
    };

    const [examTitle, setExamTitle] = useState('');
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionNum, setQuestionNum] = useState(0)

    async function submitHandler(event: React.FormEvent){
        event.preventDefault();
        setQuestionNum(questionNum + 1)
        const questionObj = {
            title: examTitle,
            number: questionNum,
            question: question,
            answer: answer,
            status: "Not Visited",
            response: "",
            result: "",
            createdat: new Date().toISOString()
        }

        try {
            await axios.post('/api/questions', questionObj)
            alert('Post added')
            window.location.reload()
        } catch (error) {
            console.error('Error adding article', error)     
        }
    }

   return(
    <form onSubmit={submitHandler} className="space-y-3">
      <label htmlFor="title">Exam Title</label>
      <br />
      <input
        className="w-[100%] p-2 border-2 border-gray-400 outline-none"
        type="text"
        value={examTitle}
        name="title"
        placeholder="Enter exam title"
        onChange={(e)=>setExamTitle(e.target.value)}
        required
      />
      <DynamicEditor modules={modules} onChange={setQuestion} theme="snow" className="h-[50vh]" />
      <br /> <br /><br />
      <input
        className="w-[100%] p-2 border-2 border-gray-400 outline-none"
        type="text"
        value={answer}
        name="title"
        placeholder="Enter correct option A, B, C, D"
        onChange={(e)=>setAnswer(e.target.value)}
        required
      />
      <button className="p-1 my-4 bg-green-900 text-white font-bold hover:bg-red-900" type="submit">Save</button>
    </form>
    )
}



export default TextEditor