"use client"
import React, {useContext, useMemo, useState, ChangeEvent, FormEvent} from 'react'
import dynamic from 'next/dynamic'
import "react-quill/dist/quill.snow.css"
import axios from "axios"
import { useRouter } from 'next/navigation'

type Question = {
  number: string;
  question: string;
  status: string;
  solution: string;
  answer: string;
  response: string;
  result: string;
}

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

    const [testName, setTestName] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([
      {
        number: '',
        question: '',
        status: 'notvisited',
        solution: '',
        answer: '',
        response: '',
        result: '',
      }
    ]);

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      const questionset = questions.map((q) => ({ ...q }));
  
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

    const handleQuestionChange = (index: number, key: keyof Question, value: string) => {
      const newQuestions = [...questions];
      newQuestions[index][key] = value;
      setQuestions(newQuestions);
    };

    const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        number: '',
        question: '',
        status: 'notvisited',
        solution: '',
        answer: '',
        response: '',
        result: '',
      }
    ]);
  };

    // async function submitHandler(event: React.FormEvent){
    //     event.preventDefault();
    //     setQuestionNum(questionNum + 1)
    //     const questionObj = {
    //         title: examTitle,
    //         number: questionNum,
    //         question: question,
    //         answer: answer,
    //         status: "Not Visited",
    //         response: "",
    //         result: "",
    //         createdat: new Date().toISOString()
    //     }

    //     try {
    //         await axios.post('/api/questions', questionObj)
    //         alert('Post added')
    //         window.location.reload()
    //     } catch (error) {
    //         console.error('Error adding article', error)     
    //     }
    // }


    return (
      <div>
        <h1>Create New Test</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Test Name:</label>
            <input type="text" value={testName} onChange={(e: ChangeEvent<HTMLInputElement>) => setTestName(e.target.value)} required />
          </div>
          {questions.map((q, index) => (
            <div key={index}>
              <label>Question {index + 1}:</label>
              <input type="text" placeholder="Number" value={q.number} onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'number', e.target.value)} required />
              <DynamicEditor modules={modules} theme="snow" value={q.question} className="h-[50vh]" onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'question', e.target.value)} required />
              <input type="text" placeholder="Solution" value={q.solution} onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'solution', e.target.value)} required />
              <input type="text" placeholder="Answer" value={q.answer} onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'answer', e.target.value)} required />
            </div>
          ))}
          <button type="button" onClick={addQuestion}>Add Question</button>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}



export default TextEditor