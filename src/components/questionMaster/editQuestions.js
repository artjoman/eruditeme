import React, { Component } from "react";
import { connect } from "react-redux";
import { FormGroup, Input, Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Modal from 'react-awesome-modal';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';
import { common, green, red } from '@material-ui/core/colors';
import { fb } from '../../firebase'
import { addQuestion, addCategory } from "../../actions";

class EditQuestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filters: [{
                property: 'key',
                value: ''
            }],
            questions: [],
            descriptions: [],
            lines: [],
            answers: [],
            categories: [],
            visibleC: false,
            visibleQ: false,
            key: null
        };
    }

    handleCommitCategory = (event) => {
        const { dispatch } = this.props;
        var request = {
            name: this.state.name
        }
        dispatch(addCategory(request));
    }

    handleCommitQuestions = (event) => {
        const { dispatch } = this.props;
        let question = {
            text: this.state.question,
            author: this.state.author || 'System',
            description: this.state.description
        };
        let answers = this.state.answers;
        dispatch(addQuestion(this.state.category, question, answers));
        this.setState({
            text: null,
            author: null,
            answers: []
        })
        this.closeModal('visibleQ');
    }

    componentDidMount() {
        let ref = fb.database().ref('/questions');
        ref.on('value', snapshot => {
            let questionData = [];
            if (snapshot.val()) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    var data = {
                        ...childData,
                        key: childSnapshot.key
                    };
                    questionData.push(data);
                });
            }
            console.log(questionData);
            this.setState({
                questions: questionData
            });
        });

        ref = fb.database().ref('/categories');
        ref.on('value', snapshot => {
            let categoryData = [];
            if (snapshot.val()) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    var data = {
                        name: childData,
                        key: childSnapshot.key
                    };
                    categoryData.push(data);
                });
            }
            this.setState({
                categories: categoryData
            });
        });
    }

    handleFormChange = (event) => {
        const { checked, name, value, type } = event.target;
        const setValue = type === 'checkbox' ? checked : value;

        this.setState({
            [name]: setValue
        });
    };

    createFilter = (filters) => {
        if (typeof filters[0] === 'string') {
            filters = [
                {
                    property: filters[0],
                    value: filters[1]
                }
            ];
        }
        return item => filters.every(filter => this.doFilter(item, filter));
    };

    doFilter = (item, filter) => {
        let { value } = filter;
        if (!(value instanceof RegExp)) {
            value = filter.value = new RegExp(value, 'i');
        }

        return value.test(item[filter.property]);
    }

    openModalC(key) {
        this.setState({
            visibleC: true
        });
    }

    openModalQ(key) {
        if (key) {
            this.state.filters[0].value = key;
            let select = this.state.colors.filter(this.createFilter(this.state.filters));
            this.setState({
                key: select[0].key,
                name: select[0].name,
                link: null,
            });
        }
        this.setState({
            visibleQ: true
        });
    }

    closeModal(modal) {
        this.setState({
            [modal]: false
        });
    }

    handleAnswer = () => {
        if (this.state.aText && this.state.aWeight) {
            let answer = {
                answer: this.state.aText,
                weight: this.state.aWeight
            }
            let tmp = this.state.answers.concat({
                answer: this.state.aText,
                weight: this.state.aWeight
            });
            this.setState({
                answers: tmp,
                aText: null,
                aWeight: null
            })
        }
    }

    render() {
        const { t } = this.props;
        return (
            <Table width="1000px">
                <TableBody>
                    <TableRow >
                        <TableCell colSpan="2" align="left" style={{ verticalAlign: 'top' }}></TableCell>
                        <TableCell align="right" style={{ verticalAlign: 'top' }}>
                            <AddCircleIcon fontSize="large" style={{ color: green[500] }} onClick={() => this.openModalC()} />
                            <AddCircleIcon fontSize="large" style={{ color: common[500] }} onClick={() => this.openModalQ()} />
                        </TableCell>
                    </TableRow>
                    {
                        this.state.questions && this.state.questions.length > 0 ?
                            (
                                this.state.questions.map(category => (
                                    <>
                                        <TableRow >
                                            <TableCell align="left" style={{ border: 'none' }}>{category.name}</TableCell>
                                            <TableCell align="center" style={{ border: 'none' }}>
                                            </TableCell>
                                        </TableRow>
                                        {category.length > 0 ? (
                                            category.questions.map(question => (
                                                <TableRow >
                                                    <TableCell align="left" style={{ border: 'none' }}>{question.text}({question.author})</TableCell>
                                                    <TableCell align="center" style={{ border: 'none' }}>
                                                        <UpdateIcon fontSize="large" style={{ color: green[500] }} onClick={() => this.openModal()} />
                                                        <DeleteIcon fontSize="large" style={{ color: red[500] }} onClick={() => this.handleRemove()} />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (null)}
                                    </>
                                ))
                            ) : (null)
                    }
                </TableBody>
                <Modal visible={this.state.visibleC} width="800" height="300" effect="fadeInUp" onClickAway={() => this.closeModal('visibleC')}>
                    <FormGroup>
                        <Table width="600px">
                            <TableBody>
                                <TableRow>
                                    <TableCell align="right" style={{ border: 'none' }}>
                                        <CloseIcon onClick={() => this.closeModal('visibleC')} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" style={{ border: 'none' }}>
                                        <Input name="name" style={{ width: 300 }} value={this.state.name || ''} type="text" label="Category name" placeholder="Category name" onChange={this.handleFormChange} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" style={{ border: 'none' }}>
                                        <Button color="secondary" onClick={this.handleCommitCategory}>Save</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </FormGroup>
                </Modal>
                <Modal visible={this.state.visibleQ} width="800" height="1000" effect="fadeInUp" onClickAway={() => this.closeModal('visibleQ')}>
                    <div class="modal">
                        <FormGroup>
                            <Table width="600px">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="right" style={{ border: 'none' }}>
                                            <CloseIcon onClick={() => this.closeModal('visibleQ')} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" style={{ border: 'none' }}>
                                            <RadioGroup name="category" value={this.state.category} onChange={this.handleFormChange}>
                                                {this.state.categories.map(cat => (
                                                    <FormControlLabel value={cat.key} control={<Radio />} label={cat.name} />
                                                ))}
                                            </RadioGroup>
                                            {/* <InputLabel id="category-label">Category</InputLabel>
                                        <Select name="category" labelId="category-label" value={this.state.category} onChange={this.handleFormChange} input={<Input />}>
                                                {this.state.categories.map(cat => (
                                                    <FormControlLabel value={cat.key} control={<MenuItem />} label={cat.name} />
                                                ))}
                                            </Select> */}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" style={{ border: 'none' }}>
                                            <Input name="question" style={{ width: 300 }} value={this.state.question || ''} type="text" label="Question" placeholder="Question" onChange={this.handleFormChange} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" style={{ border: 'none' }}>
                                            <Input name="author" style={{ width: 300 }} value={this.state.author || ''} type="text" label="Author" placeholder="Author" onChange={this.handleFormChange} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" style={{ border: 'none' }}>
                                            <Input name="description" style={{ width: 300 }} value={this.state.description || ''} type="text" label="Description" placeholder="Description" onChange={this.handleFormChange} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" style={{ border: 'none' }}>
                                            <Table width="400px">
                                                <TableBody>
                                                    {this.state.answers.map((answer) => (
                                                        <TableRow>
                                                            <TableCell align="center" style={{ border: 'none' }}>{answer.answer}</TableCell>
                                                            <TableCell align="left" style={{ border: 'none' }}>{answer.weight}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" style={{ border: 'none' }}>
                                            <Input name="aText" style={{ width: 200 }} value={this.state.aText || ''} type="text" label="Text" placeholder="Test" onChange={this.handleFormChange} />
                                            <Input name="aWeight" style={{ width: 200 }} value={this.state.aWeight || ''} type="text" label="Weight" placeholder="Weight" onChange={this.handleFormChange} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" style={{ border: 'none' }}>
                                            <Button color="secondary" onClick={this.handleAnswer}>Save Answer</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" style={{ border: 'none' }}>
                                            <Button color="secondary" onClick={this.handleCommitQuestions}>Save</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </FormGroup>
                    </div>
                </Modal>
            </Table>
        )
    }
}


function mapStateToProps(state) {
    return {
    };
}

export default (connect(mapStateToProps)(EditQuestions));