import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function App() {
	const editorRef = useRef(null);
	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};

	const [file, setFile] = useState({
		fileName: '',
		fileContent: '',
	});
	const [cssFile, setCssFile] = useState({
		fileName: '',
		fileContent: '',
	});
	const [image, setImage] = useState([]);
	// cssFile.fileContent =
	// 	'.dropcap {float: left;font-size: 5em;padding-right: 3px;line-height: 95% } body {font-family: Helvetica, Arial, sans-serif;font-size: 16px;background-color: #d8e3fa}';
	const handleChange = (e) => {
		localStorage.removeItem('current_docs');
		const reader = new FileReader();
		const file = e.target.files[0];
		reader.readAsText(file);
		reader.onload = () => {
			setFile({
				fileName: file.name,
				fileContent: reader.result,
			});
		};
	};
	console.log('🚀 ~ file: App.js:44 ~ handleCssChange ~ reader', file);

	const handleCssChange = (e) => {
		localStorage.removeItem('current_style');
		const reader = new FileReader();
		const file = e.target.files[0];
		reader.readAsText(file);
		reader.onload = () => {
			setCssFile({
				fileName: file.name,
				fileContent: reader.result,
			});
		};
	};
	const handleImgChange = (e) => {
		localStorage.removeItem('current_imgs');
		const reader = new FileReader();
		const file = e.target.files[0];
		reader.readAsText(file);
		reader.onload = () => {
			setImage(...image, reader.result);
		};
	};

	if (file.fileContent !== '')
		localStorage.setItem('current_docs', file.fileContent);
	if (image.length !== 0) localStorage.setItem('current_imgs', image);

	if (cssFile.fileContent !== '') {
		localStorage.setItem('current_style', cssFile.fileContent);
		setTimeout(() => {
			window.location.reload(false);
		}, 1000);
	}

	return (
		<>
			<label htmlFor='files'>Select html file</label>
			<input
				type='file'
				style={{ margin: '2rem' }}
				onChange={handleChange}
			/>
			<label htmlFor='img'>Select multiple img</label>
			<input
				type='file'
				style={{ margin: '2rem' }}
				multiple
				onChange={handleImgChange}
			/>
			<label htmlFor='css'>Select css file</label>
			<input
				type='file'
				style={{ margin: '2rem' }}
				onChange={handleCssChange}
			/>
			<Editor
				apiKey='lyu8q4tlts0q29b9nur4nvsc7umc2d134c86r6xs40s8tyw9'
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue={
					localStorage.getItem('current_docs') || '<p>Hello World</p>'
				}
				init={{
					selector: 'textarea#full-featured',
					style_formats_merge: false,
					style_formats: [
						{
							title: 'Headings',
							items: [
								{ title: 'Heading 1', format: 'h1' },
								{ title: 'Heading 2', format: 'h2' },
								{ title: 'Heading 3', format: 'h3' },
								{ title: 'Heading 4', format: 'h4' },
								{ title: 'Heading 5', format: 'h5' },
								{ title: 'Heading 6', format: 'h6' },
							],
						},
						{
							title: 'Inline',
							items: [
								{ title: 'Bold', format: 'bold' },
								{ title: 'Italic', format: 'italic' },
								{ title: 'Underline', format: 'underline' },
								{
									title: 'Strikethrough',
									format: 'strikethrough',
								},
								{ title: 'Superscript', format: 'superscript' },
								{ title: 'Subscript', format: 'subscript' },
								{ title: 'Code', format: 'code' },
							],
						},
						{
							title: 'Blocks',
							items: [
								{ title: 'Paragraph', format: 'p' },
								{ title: 'Blockquote', format: 'blockquote' },
								{ title: 'Div', format: 'div' },
								{ title: 'Pre', format: 'pre' },
							],
						},
						{
							title: 'Align',
							items: [
								{ title: 'Left', format: 'alignleft' },
								{ title: 'Center', format: 'aligncenter' },
								{ title: 'Right', format: 'alignright' },
								{ title: 'Justify', format: 'alignjustify' },
							],
						},
						{
							title: 'Containers',
							items: [
								{
									title: 'section',
									block: 'section',
									wrapper: true,
									merge_siblings: false,
								},
								{
									title: 'article',
									block: 'article',
									wrapper: true,
									merge_siblings: false,
								},
								{
									title: 'blockquote',
									block: 'blockquote',
									wrapper: true,
								},
								{
									title: 'hgroup',
									block: 'hgroup',
									wrapper: true,
								},
								{
									title: 'aside',
									block: 'aside',
									wrapper: true,
								},
								{
									title: 'figure',
									block: 'figure',
									wrapper: true,
								},
							],
						},
						{
							title: 'Custom Format',
							items: [
								{
									title: 'Subheading',
									block: 'h5',
									classes: 'subheading',
								},
								{
									title: 'Drop Cap',
									inline: 'span',
									classes: 'dropcap clearfix',
								},
							],
						},
					],
					plugins:
						'tinymcespellchecker preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons  searchreplace',
					editimage_cors_hosts: ['picsum.photos'],
					menubar: 'file edit view insert format tools table help',
					toolbar:
						'insertfile a11ycheck undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
					toolbar_sticky: true,
					spellchecker_dialog: true,
					autosave_ask_before_unload: true,
					autosave_interval: '30s',
					autosave_prefix: '{path}{query}-{id}-',
					autosave_restore_when_empty: false,
					autosave_retention: '2m',
					/* enable automatic uploads of images represented by blob or data URIs*/
					automatic_uploads: true,
					image_advtab: true,
					image_title: true,
					link_list: [
						{ title: 'My page 1', value: 'https://www.tiny.cloud' },
						{
							title: 'My page 2',
							value: 'http://www.moxiecode.com',
						},
					],
					image_list: [
						{ title: 'My page 1', value: 'https://www.tiny.cloud' },
						{
							title: 'My page 2',
							value: 'http://www.moxiecode.com',
						},
					],
					image_class_list: [
						{ title: 'None', value: '' },
						{ title: 'Some class', value: 'class-name' },
					],
					importcss_append: true,
					file_picker_callback: (callback, value, meta) => {
						/* Provide file and text for the link dialog */
						if (meta.filetype === 'file') {
							callback(
								'https://www.google.com/logos/google.jpg',
								{ text: 'My text' }
							);
						}

						/* Provide image and alt text for the image dialog */
						if (meta.filetype === 'image') {
							callback(
								'https://www.google.com/logos/google.jpg',
								{
									alt: 'My alt text',
								}
							);
						}
						/* Provide alternative source and posted for the media dialog */
						if (meta.filetype === 'media') {
							callback('movie.mp4', {
								source2: 'alt.ogg',
								poster: 'https://www.google.com/logos/google.jpg',
							});
						}
					},
					templates: [
						{
							title: 'New Table',
							description: 'creates a new table',
							content:
								'<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
						},
						{
							title: 'Starting my story',
							description: 'A cure for writers block',
							content: 'Once upon a time...',
						},
						{
							title: 'New list with dates',
							description: 'New List with dates',
							content:
								'<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
						},
					],
					template_cdate_format:
						'[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
					template_mdate_format:
						'[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
					height: 600,
					image_caption: true,
					quickbars_selection_toolbar:
						'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
					noneditable_class: 'mceNonEditable',
					toolbar_mode: 'sliding',
					contextmenu: 'link image table',
					content_css: '/content.css',
					content_css_cors: true,
					content_style: localStorage.getItem('current_style'),
					// content_style:
					// 	'.dropcap { float: left; font-size: 5em; padding-right: 3px;  line-height: 95%; } body { font-family:Helvetica,Arial,sans-serif; font-size:16px;',
				}}
			/>
			<button onClick={log}>Log editor content</button>
		</>
	);
}
