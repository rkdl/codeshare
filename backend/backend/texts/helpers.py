STD_DATE_FORMAT = '%d-%m-%Y'


def prepare_text_document_structure(text_document):
    return {
        'text': text_document['text'],
        'language': text_document['language'],
        'expireTime': text_document['expire_datetime'].strftime(STD_DATE_FORMAT),
        'identifier': text_document['identifier'],
        'userIdentifier': text_document['user_identifier']
    }
