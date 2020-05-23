import React, { Component } from 'react';
import axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id : "",
            password : "",
            title : "",
            contents : "",
        }
    }

    _submitBoard = async function (){
        const contents = this.state.contents;

        const title = document.getElementsByName('title')[0].value.trim();

        const id = this.state.id;
        const password = this.state.password;
        const data = { title : title , contents : contents };
        const res = await axios('/add/board', {
            method : 'POST',
            data : data,
            headers: new Headers()
        })


        if(res.data){
            alert('글 등록이 완료되었습니다.');
            return window.location.replace('/');
        }
    }


    render() {
        return (
            <div className="App">
                <div>
                    <input type='text' id='title' name='title' placeholder='  제목'/>
                </div>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p></p>"
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.setState({'contents':data});
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                <button onClick={() => this._submitBoard()}> 포스트 등록 </button>
            </div>
        );
    }
}

export default Editor;