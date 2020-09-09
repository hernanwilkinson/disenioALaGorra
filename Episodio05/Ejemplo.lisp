
(define (filtrar lista condicion)
   (cond
     ((esta-vacia lista) lista-vacia)
     ((condicion (primero-de lista)) (concatenar (primero-de lista) (filtrar (resto-de lista) condicion)))
     (else (filtrar (resto-de lista) condicion))))

(filtrar '(1 2 3 4) (lambda (x) (< x 3)))

(define factorial (lambda (n)
 (cond
   ((eq? n 1) 1)
   (else (* n (factorial (- n 1))))))
