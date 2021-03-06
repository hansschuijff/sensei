/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { Notice, Button, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Filter from './filter';
import Questions from './questions';
import Actions from './actions';

/**
 * Questions modal content.
 *
 * @param {Object}   props
 * @param {Function} props.setOpen              Modal open state setter.
 * @param {Function} props.addExistingQuestions Callback to add existing questions.
 */
const QuestionsModalContent = ( { setOpen, addExistingQuestions } ) => {
	const [ filters, setFilters ] = useState( {
		search: '',
		'question-type': '',
		'question-category': '',
	} );

	const [ errorAddingSelected, setErrorAddingSelected ] = useState( false );
	const [ selectedQuestionIds, setSelectedQuestionIds ] = useState( [] );

	const questionCategories = useSelect( ( select ) =>
		select( 'core' ).getEntityRecords( 'taxonomy', 'question-category', {
			per_page: -1,
		} )
	);

	return (
		<Modal
			className="sensei-lms-quiz-block__questions-modal"
			title={ __( 'Questions', 'sensei-lms' ) }
			onRequestClose={ () => {
				setOpen( false );
			} }
		>
			{ errorAddingSelected && (
				<Notice
					status="error"
					isDismissible={ false }
					className="sensei-lms-quiz-block__questions-modal__notice"
				>
					{ __(
						'Unable to add the selected question(s). Please make sure you are still logged in and try again.',
						'sensei-lms'
					) }
				</Notice>
			) }
			<Filter
				questionCategories={ questionCategories }
				filters={ filters }
				setFilters={ setFilters }
			/>
			<Questions
				questionCategories={ questionCategories }
				filters={ filters }
				selectedQuestionIds={ selectedQuestionIds }
				setSelectedQuestionIds={ setSelectedQuestionIds }
			/>
			<Actions
				selectedQuestionIds={ selectedQuestionIds }
				setSelectedQuestionIds={ setSelectedQuestionIds }
				addExistingQuestions={ addExistingQuestions }
				setOpen={ setOpen }
				setErrorAddingSelected={ setErrorAddingSelected }
			/>
		</Modal>
	);
};

/**
 * Questions modal with opener.
 *
 * @param {Object}   props
 * @param {Object}   props.children             Modal opener label.
 * @param {Function} props.addExistingQuestions Callback to add existing questions.
 */
const QuestionsModal = ( { children, addExistingQuestions } ) => {
	const [ isOpen, setOpen ] = useState( false );

	return (
		<>
			<div className="sensei-lms-quiz-block__questions-modal-opener">
				<Button
					isPrimary
					isSmall
					onClick={ () => {
						setOpen( ( open ) => ! open );
					} }
				>
					{ children }
				</Button>
			</div>

			{ isOpen && (
				<QuestionsModalContent
					setOpen={ setOpen }
					addExistingQuestions={ addExistingQuestions }
				/>
			) }
		</>
	);
};

export default QuestionsModal;
