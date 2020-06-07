


def set_colour_code(quantity,critical_val):

      
      
      if(quantity< 0.3 * critical_val):
            return "red"

      elif(quantity< 0.75 * critical_val):
            return "yellow"   

      elif(quantity< critical_val):
            return "green"    

      else:
            print("Critical Value is lesser than Quantity Available")           
            return "green"