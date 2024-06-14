"use client"
import React, {useContext, useMemo, useState} from 'react'
import dynamic from 'next/dynamic'
import "react-quill/dist/quill.snow.css"
import axios from "axios"
import { useRouter } from 'next/navigation'

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
    const [answer, setAnswer] = useState('')
    const [questionNum, setQuestionNum] = useState(0)
    const [testName, setTestName] = useState('');
    const [question, setQuestion] = useState([])
    const [questions, setQuestions] = useState([{ number: '', question: '', options: [], status: 'notvisited', solution: '', answer: '', response: '', result: '', section: '' }]);
    const router = useRouter();

    const handleSubmit = async () => {
      // e.preventDefault();
      const questionset = questions.map((q) => ({ ...q, options: q.options.split(',') }));
  
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ testName, questionset })
      });
  
      if (res.ok) {
        router.push('/tests');
      } else {
        console.error('Failed to create test');
      }
    };

    const handleQuestionChange = (index, key, value) => {
      const newQuestions = [...questions];
      newQuestions[index][key] = value;
      setQuestions(newQuestions);
    };
  
    const addQuestion = () => {
      setQuestions([...questions, { number: '', question: '', options: [], status: 'notvisited', solution: '', answer: '', response: '', result: '', section: '' }]);
    };

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
    <>
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
    <form onSubmit={handleSubmit}>
        <div>
          <label>Test Name:</label>
          <input type="text" value={testName} onChange={(e) => setTestName(e.target.value)} required />
        </div>
        {questions.map((q, index) => (
          <div key={index}>
            <label>Question {index + 1}:</label>
            <input type="text" placeholder="Number" value={q.number} onChange={(e) => handleQuestionChange(index, 'number', e.target.value)} required />
            <input type="text" placeholder="Question" value={q.question} onChange={(e) => handleQuestionChange(index, 'question', e.target.value)} required />
            <input type="text" placeholder="Options (comma separated)" value={q.options} onChange={(e) => handleQuestionChange(index, 'options', e.target.value)} required />
            <input type="text" placeholder="Solution" value={q.solution} onChange={(e) => handleQuestionChange(index, 'solution', e.target.value)} required />
            <input type="text" placeholder="Answer" value={q.answer} onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)} required />
            <input type="text" placeholder="Section" value={q.section} onChange={(e) => handleQuestionChange(index, 'section', e.target.value)} required />
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Submit</button>
      </form>
    </>
    )
}



export default TextEditor